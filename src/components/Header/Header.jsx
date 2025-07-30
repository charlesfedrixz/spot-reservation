import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [activeTab, setActiveTab] = React.useState("home");
  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between px-10 bg-white-70 text-charcoalGray backdrop-blur-sm items-center p-4 shadow-md">
      <div className="text-2xl font-bold text-gray-800">
        Search<span className="text-green-600">MyPlay</span>
      </div>
      <div className="hidden md:flex space-x-6">
        <button
          className={`py-2 px-1 ${
            activeTab === "home"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-500"
          }`}
          onClick={() => setActiveTab("home")}
        >
          Home
        </button>
        <button
          className={`py-2 px-1 ${
            activeTab === "turfs"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-500"
          }`}
          onClick={() => setActiveTab("turfs")}
        >
          Our Turfs
        </button>
        <button
          className={`py-2 px-1 ${
            activeTab === "book"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-500"
          }`}
          onClick={() => setActiveTab("book")}
        >
          Book Now
        </button>
        <button
          className={`py-2 px-1 ${
            activeTab === "contact"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600 hover:text-green-500"
          }`}
          onClick={() => setActiveTab("contact")}
        >
          Contact
        </button>
      </div>
      <div className="flex space-x-4">
        <Link
          to={"login"}
          className="px-4 py-2 text-gray-600 hover:text-green-600"
        >
          Login
        </Link>
        <Link
          to={"register"}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
