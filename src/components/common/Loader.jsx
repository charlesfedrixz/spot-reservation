// src/components/common/Loader.jsx
import { motion } from "framer-motion";

const Loader = ({ size = 40, color = "blue" }) => {
  const borderSize = Math.max(size / 8, 2); // dynamic border thickness

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="rounded-full"
        style={{
          width: size,
          height: size,
          borderWidth: borderSize,
          borderStyle: "solid",
          borderColor: `${color}`,
          borderTopColor: "transparent",
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
