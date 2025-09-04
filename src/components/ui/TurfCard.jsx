import { motion } from "framer-motion";
import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FiMapPin, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function TurfCard({ turf, i }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % turf.image.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? turf.image.length - 1 : prev - 1));

  const imageUrl =
    // turf?.image?.[currentIndex] && turf.image[currentIndex].length > 0
    //   ? turf.image[currentIndex]
    turf?.image?.length > 0
      ? turf.image[currentIndex]
      : "https://images.unsplash.com/photo-1574629810360-7efbbe195018";

  return (
    <motion.div
      key={turf._id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
    >
      {/* Image slider */}
      {turf?.image?.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <motion.div
            key={currentIndex}
            className="h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-md font-semibold">
            <div className="flex justify-center items-center space-x-1">
              <FaRupeeSign />
              {turf?.prices?.hourly?.price} /hr
            </div>
          </div>

          {/* Controls */}
          {turf.image.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-2"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{turf?.name}</h3>

        <div className="flex items-center text-gray-600 mb-2">
          <FiMapPin className="mr-2" />
          <span>{turf?.location?.address}</span>
        </div>

        <div className="flex items-center mb-4">
          <FiStar className="text-yellow-500 mr-1" />
          <span className="font-semibold">{turf.rating}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {turf?.amenities?.length > 0 ? (
            turf.amenities.map((feature, index) =>
              feature && !feature.includes("undefined") ? (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ) : null
            )
          ) : (
            <p className="text-muted-foreground">No Amenities</p>
          )}
        </div>

        <Link
          to={`/our-turfs/${turf._id}`}
          className="w-full py-2 px-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition block text-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
