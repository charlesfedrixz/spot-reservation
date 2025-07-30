import { Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function TurfManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Turfs</h2>
        <NavLink
          to={"create-turf"}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Turf
        </NavLink>
      </div>
      <div>{/* Turf list or other content can go here */}</div>
      {/* Outlet for nested routes */}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
