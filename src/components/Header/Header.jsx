import { Calendar, Home, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [activeTab, setActiveTab] = React.useState("home");

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

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between px-10 bg-white/70 text-gray-800 backdrop-blur-sm items-center p-4 shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        Search<span className="text-green-600">MyPlay</span>
      </div>

      {/* Tabs */}
      <div className="hidden md:flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center py-2 px-1 font-medium ${
              activeTab === tab.name
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Auth Links */}
      <div className="flex space-x-4 mt-2 md:mt-0">
        <Link
          to={"login"}
          className="px-4 py-2 text-gray-600 hover:text-green-600 flex items-center"
        >
          Login
        </Link>
        <Link
          to={"register"}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
