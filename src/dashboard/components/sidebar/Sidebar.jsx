import {
  BarChart3,
  Bell,
  ChevronDown,
  FileText,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ userRole }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "booking-management",
      label: "Booking Management",
      icon: Users,
      href: "/dashboard/booking-management", // ✅ Correct path
      badge: "12",
    },
    {
      id: "customers-management",
      label: "Customers",
      icon: Users,
      href: "/dashboard/customers-management",
    },
    {
      id: "turf-management",
      label: "Turfs",
      icon: Package,
      href: "/dashboard/turf-management",
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
      href: "/dashboard/orders",
    }, // add route if needed
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/dashboard/analytics",
    }, // add route if needed
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      href: "/dashboard/reports",
    }, // add route if needed
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "/dashboard/notifications",
    }, // add route if needed
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    }, // add route if needed
  ];

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
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group relative ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span
                    className={`font-medium ${
                      isCollapsed ? "hidden" : "block"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
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
