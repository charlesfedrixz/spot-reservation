import { handleAdminLogout } from "@/dashboard/api/apiServices";
import { useMutation } from "@tanstack/react-query";
import { Bell, Menu } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header({ activeTab, userRole, setSidebarOpen }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleAdminLogout,
    onSuccess: () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("email");
      window.location.href = "auth/login"; // Redirect to login page
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error(error?.response?.data?.message);
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {userInfo?.role === "superadmin" ? "SA" : "A"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {userInfo?.role}
                  </span>
                </button>
                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10"
                    onMouseLeave={handleDropdownClose}
                  >
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Add your profile logic here
                        handleDropdownClose();
                      }}
                    >
                      Profile
                    </button>
                    <button
                      disabled={isPending}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        handleLogout();
                        // handleDropdownClose();
                      }}
                    >
                      {isPending ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
