import Header from "@/dashboard/components/header/Header";
import Sidebar from "@/dashboard/components/sidebar/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("admin");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = {
    totalRevenue: 15420,
    totalBookings: 87,
    activeTurfs: 3,
    totalCustomers: 156,
  };

  const bookings = [
    {
      id: 1,
      customer: "John Doe",
      turf: "Turf A",
      date: "2024-01-15",
      time: "10:00 AM - 12:00 PM",
      status: "confirmed",
      amount: 150,
    },
    {
      id: 2,
      customer: "Jane Smith",
      turf: "Turf B",
      date: "2024-01-15",
      time: "2:00 PM - 4:00 PM",
      status: "pending",
      amount: 180,
    },
    {
      id: 3,
      customer: "Mike Wilson",
      turf: "Turf C",
      date: "2024-01-16",
      time: "6:00 PM - 8:00 PM",
      status: "cancelled",
      amount: 200,
    },
  ];

  const turfs = [
    {
      id: 1,
      name: "Turf A",
      location: "North Ground",
      capacity: 22,
      pricePerHour: 75,
      status: "active",
      rating: 4.5,
      bookingsToday: 5,
    },
    {
      id: 2,
      name: "Turf B",
      location: "South Ground",
      capacity: 18,
      pricePerHour: 90,
      status: "maintenance",
      rating: 4.2,
      bookingsToday: 0,
    },
    {
      id: 3,
      name: "Turf C",
      location: "East Ground",
      capacity: 22,
      pricePerHour: 100,
      status: "active",
      rating: 4.8,
      bookingsToday: 7,
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      active: "bg-green-100 text-green-800",
      maintenance: "bg-orange-100 text-orange-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="bg-gray-100 flex flex-1">
        <Sidebar
          userRole={userRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          className="hidden md:block"
        />
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
