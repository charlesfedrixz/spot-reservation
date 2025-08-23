import { useState } from "react";

export default function BookingManagement() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "John Doe",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: "Jane Smith",
      date: "2024-01-16",
      time: "2:30 PM",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      date: "2024-01-17",
      time: "4:00 PM",
      status: "Confirmed",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Turf Booking Management</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Current Bookings</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            New Booking
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Time</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4">{booking.id}</td>
                    <td className="px-6 py-4">{booking.customer}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">{booking.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
