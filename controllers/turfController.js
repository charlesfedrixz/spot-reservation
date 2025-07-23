import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import sharp from "sharp";
import { PassThrough } from "stream";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Turf from "../models/turf.js";
import { errorResponse, successResponse } from "../middleware/errorHandler.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new PassThrough();
    bufferStream.end(fileBuffer);
    const streamUpload = cloudinary.uploader.upload_stream(
      {
        folder: "turf_Images",
        resource_type: "image",
        format: "webp",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", err);
          reject(error);
        } else resolve(result.secure_url);
      }
    );
    bufferStream.pipe(streamUpload);
  });
};
const storage = new CloudinaryStorage({
  cloudinary: cloudinary, // Fixed: Pass the cloudinary instance
  params: {
    folder: "turf_Images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [
      {
        width: 1000,
        height: 700,
        crop: "limit",
      },
    ],
  },
});
const upload = multer({ storage });

export const createTurf = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    location,
    side,
    washroom,
    changingRoom,
    shop,
    parking,
    timing,
    prices,
  } = req.body;

  // Validate required fields
  if (!name || !description || !location || !timing || !prices || !side) {
    return errorResponse(
      res,
      400,
      "Please provide all required fields: name, description, location, timing, prices, and side"
    );
  }

  // Validate files first
  if (!req.files || req.files.length === 0) {
    return errorResponse(res, 400, "At least one image is required.");
  }

  let parsedLocation, parsedTiming, parsedPrices;
  try {
    parsedLocation = JSON.parse(location);
    if (!parsedLocation.address || !parsedLocation.mapLink) {
      return errorResponse(
        res,
        400,
        "Location must include address and mapLink"
      );
    }

    parsedTiming = JSON.parse(timing);
    if (!parsedTiming.start || !parsedTiming.end) {
      return errorResponse(res, 400, "Timing must include start and end times");
    }

    parsedPrices = JSON.parse(prices);
    if (!parsedPrices.hourly || !parsedPrices.event) {
      return errorResponse(
        res,
        400,
        "Prices must include hourly and event rates"
      );
    }
  } catch (err) {
    return errorResponse(res, 400, `Invalid JSON format: ${err.message}`);
  }

  const uploadImages = [];
  for (const file of req.files) {
    try {
      const compressBuffer = await sharp(file.buffer)
        .resize({ width: 1000, height: 700, fit: "inside" })
        .webp({ quality: 80 })
        .toBuffer();
      const uploadResult = await uploadToCloudinary(compressBuffer);
      uploadImages.push(uploadResult);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  }
  try {
    const turf = new Turf({
      name,
      description,
      location: parsedLocation,
      timing: parsedTiming,
      prices: parsedPrices,
      side,
      washroom,
      changingRoom,
      shop,
      parking,
      image: uploadImages,
    });

    await turf.save();
    console.log(turf);
    return successResponse(res, 201, null, "Turf created successfully.");
  } catch (error) {
    console.error("Turf creation failed:", error);
    return errorResponse(res, 500, "Failed to create turf. Please try again.");
  }
});

export const deleteTurf = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin")
    return errorResponse(res, 403, "Unauthorized to delete Turf!");
  try {
    const turfId = req.params;
    if (!turfId) return errorResponse(res, 400, "Please provide a valid Id!");
    const findUser = await Turf.findByIdAndDelete(turfId);
    if (!findUser) return errorResponse(res, 404, "Turf not found!");
    return successResponse(res, 200, null, "Delete Turf successfully!");
  } catch (error) {
    console.log("Failed in delete turf: ", error);
    return errorResponse(
      res,
      500,
      "Failed in delete turf due to server error!"
    );
  }
});

export const turfList = asyncHandler(async (req, res) => {
  try {
    const turfList = await Turf.find();
    if (!turfList || turfList == 0)
      return errorResponse(res, 200, "Turf is empty!");
    return successResponse(res, 200, turfList, "List Truf Successfully!");
  } catch (error) {
    console.log("Failed in list turf: ", error);
    return errorResponse(res, 500, "Failed in list turf due to server error!");
  }
});

export const updateTurf = asyncHandler(async (req, res) => {
  if (req.admin.role !== "Super_Admin")
    return errorResponse(res, 403, "Unauthorized to update!");
  const turfId = req.params;
  const {
    name,
    description,
    location,
    side,
    washroom,
    changingRoom,
    shop,
    parking,
    timing,
    prices,
  } = req.body;

  try {
    if (!turfId) return errorResponse(res, 400, "Please provide a valid Id!");

    let updateData = {};

    // Add fields to update only if they are provided
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (side) updateData.side = side;
    if (washroom !== undefined) updateData.washroom = washroom;
    if (changingRoom !== undefined) updateData.changingRoom = changingRoom;
    if (shop !== undefined) updateData.shop = shop;
    if (parking !== undefined) updateData.parking = parking;

    // Parse JSON fields if provided
    if (location) {
      const parsedLocation = JSON.parse(location);
      if (!parsedLocation.address || !parsedLocation.mapLink) {
        return errorResponse(
          res,
          400,
          "Location must include address and mapLink"
        );
      }
      updateData.location = parsedLocation;
    }

    if (timing) {
      const parsedTiming = JSON.parse(timing);
      if (!parsedTiming.start || !parsedTiming.end) {
        return errorResponse(
          res,
          400,
          "Timing must include start and end times"
        );
      }
      updateData.timing = parsedTiming;
    }

    if (prices) {
      const parsedPrices = JSON.parse(prices);
      if (!parsedPrices.hourly || !parsedPrices.event) {
        return errorResponse(
          res,
          400,
          "Prices must include hourly and event rates"
        );
      }
      updateData.prices = parsedPrices;
    }

    // Handle image uploads if files are provided
    if (req.files && req.files.length > 0) {
      const uploadImages = [];
      for (const file of req.files) {
        const compressBuffer = await sharp(file.buffer)
          .resize({ width: 1000, height: 700, fit: "inside" })
          .webp({ quality: 80 })
          .toBuffer();
        const uploadResult = await uploadToCloudinary(compressBuffer);
        uploadImages.push(uploadResult);
      }
      updateData.image = uploadImages;
    }

    const updatedTurf = await Turf.findByIdAndUpdate(turfId, updateData, {
      new: true,
    });
    if (!updatedTurf) return errorResponse(res, 404, "Turf not found!");

    return successResponse(res, 200, updatedTurf, "Turf updated successfully!");
  } catch (error) {
    console.error("Failed to update turf:", error);
    return errorResponse(
      res,
      500,
      "Failed to update turf due to server error!"
    );
  }
});
