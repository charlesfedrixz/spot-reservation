import React from "react";
import { Button } from "../ui/button";
import { Contact, Home, Info, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [activeItem, setActiveItem] = React.useState('');

  const navigate = useNavigate();

  const handleNavigation = (item) => {
    setActiveItem(item);
    if (item === 'home') {
      navigate('/');
    } else {
      navigate(`/${item}`);
    }
  };

  return (
    <>
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between px-10 bg-white-70 text-charcoalGray backdrop-blur-sm items-center p-4 shadow-md">
      <div className="flex justify-between w-full md:w-auto">
        <motion.div
          className=" text-sm md:text-md font-bold font-custom text-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          search my play
        </motion.div>
        <div
          className="md:hidden transition-transform duration-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </div>
      </div>
      <ul
        className={`${
          isOpen ? "block" : "hidden md:block"
        } md:flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 text-header-color`}
      >
        {["home", "about", "services", "contact"].map((item) => (
          <motion.li
            key={item}
            className={`flex items-center gap-2 cursor-pointer hover:bg-header-hover hover:text-header-color transition-colors px-2 py-1 rounded-md ${
              activeItem === item ? 'bg-header-background text-white' : 'text-charcoalGray' 
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => handleNavigation(item)}
          >
            {item === "home" && <Home size={15} />}
            {item === "about" && <Info size={15} />}
            {item === "services" && <Mail size={15} />}
            {item === "contact" && <Contact size={15} />}
            <span className="text-sm">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
          </motion.li>
        ))}
      </ul>
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />
    </nav>
    </>
  );
};

export default Header;
