import { Shield, X } from "lucide-react";
import Navigation from "./Navigation";

export default function Sidebar({
  setSidebarOpen,
  sidebarOpen,
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
}) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">Turf Management</h1>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-5 px-2">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          onClick={() =>
            setUserRole(userRole === "admin" ? "superadmin" : "admin")
          }
          className="w-full flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Shield className="w-4 h-4 mr-2" />
          {userRole === "admin" ? "Switch to SuperAdmin" : "Switch to Admin"}
        </button>
      </div>
    </div>
  );
}
