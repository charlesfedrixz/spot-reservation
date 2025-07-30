import { handleGetAllTurfsList } from "@/dashboard/api/apiServices";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function TurfManagement() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["turfs"],
    queryFn: () => handleGetAllTurfsList(),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.map((turf) => (
          <div
            key={turf._id}
            className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {turf.name}
              </h3>
              <img
                src={turf?.image}
                alt={turf.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {/* <span>{turf.location || "Location not specified"}</span> */}
              </div>

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{turf?.prices?.hourly?.hour} Hours</span>
              </div>

              <div className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>${turf?.prices?.hourly?.price}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <NavLink
                to={`edit/${turf._id}`}
                className="px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
              >
                Edit
              </NavLink>
              <button className="px-3 py-2 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
