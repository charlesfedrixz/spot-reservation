import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log("Spot-Reservation-MongoDB Connected");
      // Start your server or perform other operations
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
export default connectDB;
