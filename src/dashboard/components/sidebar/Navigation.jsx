import {
  BarChart3,
  Calendar,
  MapPin,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navigation({ activeTab, setActiveTab, userRole }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-1">
      <button
        onClick={() => setActiveTab("overview")}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "overview"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <BarChart3 className="w-5 h-5 mr-3" />
        Overview
      </button>

      <button
        onClick={() => setActiveTab("bookings")}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "bookings"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Calendar className="w-5 h-5 mr-3" />
        Bookings
      </button>

      <button
        onClick={() => {
          setActiveTab("turfs");
          navigate("turf-management");
        }}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "turfs"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <MapPin className="w-5 h-5 mr-3" />
        Turfs
      </button>

      <button
        onClick={() => setActiveTab("customers")}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "customers"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Users className="w-5 h-5 mr-3" />
        Customers
      </button>

      {userRole === "superadmin" && (
        <button
          onClick={() => setActiveTab("admins")}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            activeTab === "admins"
              ? "bg-blue-100 text-blue-700"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Shield className="w-5 h-5 mr-3" />
          Admin Users
        </button>
      )}

      <button
        onClick={() => setActiveTab("analytics")}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "analytics"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <TrendingUp className="w-5 h-5 mr-3" />
        Analytics
      </button>

      <button
        onClick={() => setActiveTab("settings")}
        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
          activeTab === "settings"
            ? "bg-blue-100 text-blue-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Settings className="w-5 h-5 mr-3" />
        Settings
      </button>
    </div>
  );
}
