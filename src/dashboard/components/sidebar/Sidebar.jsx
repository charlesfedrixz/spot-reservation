import { getAllPermissions } from "@/dashboard/api/apiServices";
import { useQuery } from "@tanstack/react-query";
import {
  Banknote,
  BarChart3,
  Building,
  ChevronDown,
  Headphones,
  IndianRupee,
  LogOut,
  Menu,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const Icons = {
    BarChart3: BarChart3,
    Users: Users,
    Shield: Shield,
    Settings: Settings,
    IndianRupee: IndianRupee,
    Building: Building,
    Headphones: Headphones,
    Banknote: Banknote,
  };

  const {
    data: permissions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: getAllPermissions,
    onSuccess: (data) => {
      console.log("Permissions data:", data);
      // You can set state or context here if needed
    },
    onError: (error) => {
      console.error("Error fetching permissions:", error);
    },
  });
  console.log("permissions", permissions);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const grouped = {};
  let currentSection = null;

  permissions?.data?.forEach((item) => {
    if (item.section) {
      currentSection = item.name;
      grouped[currentSection] = [];
    } else {
      // If no currentSection, treat it as top-level (e.g., Dashboard)
      if (!currentSection) {
        currentSection = "General"; // or leave as "Dashboard"
        grouped[currentSection] = [];
      }
      grouped[currentSection].push(item);
    }
  });

  console.log(grouped);

  return (
    <div
      className={`bg-slate-900 text-white h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center space-x-3 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {userRole?.charAt(0)?.toUpperCase() || "A"}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-sm text-slate-400">{userRole || "Guest"}</p>
            </div>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-3">
          {Object.entries(grouped).map(([section, items]) => (
            <li key={section}>
              {/* Section Header */}
              <div
                className={`text-xs font-bold text-slate-400 uppercase mt-4 mb-2 ${
                  isCollapsed ? "hidden" : "block"
                }`}
              >
                {section}
              </div>

              {/* Section Items */}
              <ul className="space-y-1">
                {items.map((item) => {
                  const Icon = Icons[item.icon]; // Correct: pick icon from item

                  return (
                    <li key={item.id}>
                      <NavLink
                        to={
                          item.id === "dashboard"
                            ? "/dashboard"
                            : `/dashboard/${item.id}`
                        }
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                            isActive &&
                            (item.id === "dashboard"
                              ? location.pathname === "/dashboard"
                              : true)
                              ? "bg-blue-600 text-white"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`
                        }
                      >
                        {/* Icon */}
                        {Icon && <Icon size={20} className="flex-shrink-0" />}

                        {/* Label */}
                        <span className={`${isCollapsed ? "hidden" : "block"}`}>
                          {item.name}
                        </span>

                        {/* Tooltip when collapsed */}
                        {isCollapsed && (
                          <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {item.name}
                          </div>
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">JD</span>
          </div>
          <div className={`flex-1 ${isCollapsed ? "hidden" : "block"}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className={`w-full mt-3 flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          <span className={`text-sm ${isCollapsed ? "hidden" : "block"}`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
