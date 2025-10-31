import { AnimatePresence, motion } from "framer-motion";
import { Home, Info, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Link, Links, NavLink } from "react-router-dom";
import logo from "/favicon/searchMyPlay.png?url"
import DynamicNavigation from "../lightswind/dynamic-navigation";
// Constants
const NAVIGATION_TABS = [
  { name: "home", label: "Home", icon: Home },
  { name: "our-turfs", label: "Our Turfs", icon: MapPin },
  { name: "about", label: "About", icon: Info },
  { name: "contact", label: "Contact", icon: Phone },
];

// Animation variants
const animations = {
  mobileMenu: {
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
  },

  menuItem: {
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
  },

  hamburger: {
    closed: { rotate: 0 },
    open: { rotate: 180 },
  },
};

// Helper function to get active tab from current path
const getActiveTabFromPath = () => {
  const path = window.location.pathname;
  return path === "/" ? "home" : path.substring(1);
};

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center gap-2 cursor-pointer">
    <img src={logo} alt="SearchMyPlay Logo" className="h-12 w-12" />
    <div className="text-md md:text-xl font-bold text-gray-800">
      Search<span className="text-green-600">MyPlay</span>
    </div>
  </Link>
);

// Navigation Tab Item Component
const NavigationTabItem = ({
  tab,
  index,
  activeTab,
  setActiveTab,
  setIsMenuOpen,
  isMobile,
}) => {
  const Icon = tab.icon;
  const isActive = activeTab === tab.name;
  const linkPath = tab.name === "home" ? "/" : `/${tab.name}`;

  const handleClick = () => {
    setActiveTab(tab.name);
    if (isMobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const baseClasses =
    "flex text-sm items-center py-2 px-1 font-medium transition-colors duration-200 cursor-pointer";
  const activeClasses = isActive
    ? "text-green-600 border-b-2 border-green-600"
    : "text-gray-600 hover:text-green-500";

  return (
    <motion.div
      key={tab.name}
      custom={index}
      variants={isMobile ? animations.menuItem : {}}
      initial={isMobile ? "hidden" : false}
      animate={isMobile ? "visible" : false}
      exit={isMobile ? "exit" : false}
    >
      <NavLink
        to={linkPath}
        className={`${baseClasses} ${activeClasses}`}
        onClick={handleClick}
      >
        <Icon className="w-5 h-5 mr-1" />
        {tab?.label}
      </NavLink>
    </motion.div>
  );
};

// Navigation Tabs Component
const NavigationTabs = ({
  activeTab,
  setActiveTab,
  setIsMenuOpen,
  isMobile = false,
}) => (
  <>
    {NAVIGATION_TABS.map((tab, index) => (
      <NavigationTabItem
        key={tab.name}
        tab={tab}
        index={index}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMenuOpen={setIsMenuOpen}
        isMobile={isMobile}
      />
    ))}
  </>
);

// Auth Link Item Component
const AuthLinkItem = ({
  to,
  children,
  variant = "default",
  custom,
  isMobile,
}) => {
  const baseClasses = "px-4 py-2 flex items-center transition-all duration-200";
  const variantClasses = {
    default: "text-gray-600 hover:text-green-600",
    primary:
      "bg-green-600 text-white rounded-md hover:bg-green-700 transform hover:scale-105",
  };

  return (
    <motion.div
      variants={isMobile ? animations.menuItem : {}}
      initial={isMobile ? "hidden" : false}
      animate={isMobile ? "visible" : false}
      exit={isMobile ? "exit" : false}
      custom={custom}
    >
      <Link to={to} className={`${baseClasses} ${variantClasses[variant]}`}>
        {children}
      </Link>
    </motion.div>
  );
};

// Auth Links Component
const AuthLinks = ({ isMobile = false }) => (
  <div className={isMobile ? "flex flex-col gap-2" : "flex space-x-4"}>
    <AuthLinkItem to="user/login" custom={0} isMobile={isMobile}>
      Login
    </AuthLinkItem>
    <AuthLinkItem
      to="user/register"
      variant="primary"
      custom={1}
      isMobile={isMobile}
    >
      Register
    </AuthLinkItem>
  </div>
);

// User Avatar Component
const UserAvatar = ({ user, onLogout }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-2">
      <img
        src={user.avatar || "https://i.pravatar.cc/40"}
        alt="User avatar"
        className="w-8 h-8 rounded-full"
      />

      <span className="text-gray-700 font-medium">{user?.data?.name}</span>
    </div>

    <button
      onClick={onLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 transform hover:scale-105"
    >
      Logout
    </button>
  </div>
);

// Hamburger Menu Button Component
const HamburgerMenuButton = ({ isMenuOpen, onToggle }) => (
  <motion.button
    className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
    onClick={onToggle}
    aria-label="Toggle menu"
    variants={animations.hamburger}
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
          {["M4 6h16", "M4 12h16", "M4 18h16"].map((d, index) => (
            <motion.path
              key={d}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={d}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </motion.g>
      )}
    </motion.svg>
  </motion.button>
);

// Mobile Menu Component
const MobileMenu = ({
  isMenuOpen,
  activeTab,
  setActiveTab,
  setIsMenuOpen,
  user,
  onLogout,
}) => (
  <AnimatePresence mode="wait">
    {isMenuOpen && (
      <motion.div
        className="lg:hidden w-full overflow-hidden p-2"
        variants={animations.mobileMenu}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex flex-col gap-4 mt-4 pb-4">
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
            {!user ? (
              <AuthLinks isMobile={true} />
            ) : (
              <UserAvatar user={user} onLogout={onLogout} />
            )}
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);



// Main Header Component
const Header = ({ user , setUser }) => {
  const [activeTab, setActiveTab] = useState(getActiveTabFromPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 flex flex-col lg:flex-row justify-between px-4 lg:px-10 bg-white/70 text-gray-800 backdrop-blur-sm items-center p-2 md:p-4 shadow-md">
      {/* Header Top Row */}
      <div className="w-full lg:w-auto flex justify-between items-center">
        <Logo />
        <HamburgerMenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
      </div>


      {/* Mobile Menu */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        onLogout={handleLogout}
      />

      {/* Desktop Navigation */}
      <div className="hidden lg:flex space-x-4 xl:space-x-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Desktop Auth Section */}
      <div className="hidden lg:flex">
        {!user ? (
          <AuthLinks />
        ) : (
          <UserAvatar user={user} onLogout={handleLogout} />
        )}
      </div> 
      
    </nav>
  );
};

export default Header;
