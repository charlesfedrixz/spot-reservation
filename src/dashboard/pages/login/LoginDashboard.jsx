import useLoginAdmin from "@/dashboard/hooks/useLoginAdmin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginDashboard() {
  const [role, setRole] = useState("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setForm({ email: "", password: "" });
  };
  const { mutate, isPending, error } = useLoginAdmin();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: () => setForm({ email: "", password: "" }),
      }
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg font-semibold transition ${
            role === "admin"
              ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
          }`}
          onClick={() => handleRoleSwitch("admin")}
        >
          Admin Login
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg font-semibold transition ${
            role === "superadmin"
              ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
          }`}
          onClick={() => handleRoleSwitch("superadmin")}
        >
          Super Admin Login
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {role === "superadmin" && (
          <span className=" block text-center text-sm text-rose-500">
            Super Admins have full access to all features.
          </span>
        )}
        <div className="space-y-2 ">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder={`Enter ${
              role === "admin" ? "Admin" : "Super Admin"
            } email`}
            required
            disabled={isPending}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter Password"
            required
            disabled={isPending}
          />
        </div>
        {error && (
          <span className="text-red-300">
            {" "}
            {error?.response?.data?.message}
          </span>
        )}
        <button
          disabled={isPending}
          type="submit"
          className={`w-full py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow transition ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {isPending
            ? "Logging in..."
            : role === "admin"
            ? "Login as Admin"
            : "Login as Super Admin"}
        </button>
      </form>
    </div>
    // </div> S
  );
}
