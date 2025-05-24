/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  LucideCoffee,
  LucideParkingCircle,
  LucideToilet,
  MapPin,
} from "lucide-react";
export default function Card({ item }) {
  console.log(item);
  const washroom = item.washroom === true && <LucideToilet size={18} />;
  const parking = item.parking === true && <LucideParkingCircle size={18} />;
  const cafeteria = item.cafeteria === true && <LucideCoffee size={18} />;
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
      <motion.img
        className="w-full h-64 object-cover"
        src={item.image}
        alt={item.turfName || "Turf image"}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-4 flex flex-col gap-2 text-muted-foreground">
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-sm items text-center  ">{item.turfName}</h3>
          <div className="flex items-center gap-4 text-emerald-600">
            {washroom}
            {parking}
            {cafeteria}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span> {item.location}</span>
          <span className="flex items-center gap-2">
            <MapPin color="red" /> <h1>{item.distance}</h1>
          </span>
        </div>
      </div>
    </div>
  );
}
