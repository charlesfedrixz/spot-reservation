import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Home, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/favicon/searchMyPlay.png";

// Logo Component
const Logo = () => (
  <Link to={"/"} className="flex items-center gap-2 cursor-pointer">
    <img src={logo} alt="SearchMyPlay Logo" className="h-12 w-12" />
    <div className="text-md md:text-xl font-bold text-gray-800">
      Search<span className="text-green-600">MyPlay</span>
    </div>
  </Link>
);

// Navigation Tabs Component
const NavigationTabs = ({
  activeTab,
  setActiveTab,
  setIsMenuOpen = null,
  isMobile = false,
}) => {
  const tabs = [
    { name: "home", label: "Home", icon: <Home className="w-5 h-5 mr-1" /> },
    {
      name: "turfs",
      label: "Our Turfs",
      icon: <MapPin className="w-5 h-5 mr-1" />,
    },
    {
      name: "book",
      label: "Book Now",
      icon: <Calendar className="w-5 h-5 mr-1" />,
    },
    {
      name: "contact",
      label: "Contact",
      icon: <Phone className="w-5 h-5 mr-1" />,
    },
  ];

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return tabs.map((tab, index) => (
    <motion.button
      key={tab.name}
      custom={index}
      variants={isMobile ? itemVariants : {}}
      initial={isMobile ? "hidden" : false}
      animate={isMobile ? "visible" : false}
      exit={isMobile ? "exit" : false}
      className={`flex text-sm items-center py-2 px-1 font-medium transition-colors duration-200 ${
        activeTab === tab.name
          ? "text-green-600 border-b-2 border-green-600"
          : "text-gray-600 hover:text-green-500"
      }`}
      onClick={() => {
        setActiveTab(tab.name);
        if (isMobile && setIsMenuOpen) setIsMenuOpen(false);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {tab.icon}
      {tab.label}
    </motion.button>
  ));
};

// Auth Links Component
const AuthLinks = ({ isMobile = false }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: (index + 4) * 0.1, // Start after navigation items
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className={`${isMobile ? "flex flex-col gap-2" : "flex space-x-4"}`}>
      <motion.div
        variants={isMobile ? itemVariants : {}}
        initial={isMobile ? "hidden" : false}
        animate={isMobile ? "visible" : false}
        exit={isMobile ? "exit" : false}
        custom={0}
      >
        <Link
          to={"login"}
          className="px-4 py-2 text-gray-600 hover:text-green-600 flex items-center transition-colors duration-200"
        >
          Login
        </Link>
      </motion.div>
      <motion.div
        variants={isMobile ? itemVariants : {}}
        initial={isMobile ? "hidden" : false}
        animate={isMobile ? "visible" : false}
        exit={isMobile ? "exit" : false}
        custom={1}
      >
        <Link
          to={"register"}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 flex items-center transform hover:scale-105"
        >
          Register
        </Link>
      </motion.div>
    </div>
  );
};

// Main Header Component
export default function Header() {
  const [activeTab, setActiveTab] = React.useState("home");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Animation variants for the mobile menu container
  const menuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
      },
    },
  };

  // Hamburger menu icon animation variants
  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  };

  return (
    <nav className="sticky top-0 z-50 flex flex-col lg:flex-row justify-between px-4 lg:px-10 bg-white/70 text-gray-800 backdrop-blur-sm items-center p-2 md:p-4 shadow-md">
      <div className="w-full lg:w-auto flex justify-between items-center">
        <Logo />

        <motion.button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          variants={hamburgerVariants}
          animate={isMenuOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.g>
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0 }}
                />
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 12h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 18h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </motion.g>
            )}
          </motion.svg>
        </motion.button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="lg:hidden w-full overflow-hidden p-2"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex flex-col gap-4 mt-4 pb-4">
              <NavigationTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setIsMenuOpen={setIsMenuOpen}
                isMobile={true}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="border-t border-gray-200 pt-4"
              >
                <AuthLinks isMobile={true} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Menu */}
      <div className="hidden lg:flex space-x-4 xl:space-x-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Desktop Auth Links */}
      <div className="hidden lg:flex">
        <AuthLinks />
      </div>
    </nav>
  );
}
