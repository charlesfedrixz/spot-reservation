import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-green-200 border-r-green-600"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="absolute top-2 right-2 bottom-2 left-2 md:top-4 md:right-4 md:bottom-4 md:left-4 rounded-full opacity-80"
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
      </motion.div>
    </div>
  );
}
