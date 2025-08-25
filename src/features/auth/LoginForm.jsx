import useLoginForm from "@/hooks/api/useLoginForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/favicon/searchMyPlay.png";

const LoginForm = () => {
  const [form, setForm] = useState({ number: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.number) {
      errs.number = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(form.number)) {
      errs.number = "Phone number is invalid";
    }
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const { mutate, isPending } = useLoginForm({ data: form });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      mutate(undefined, {
        onSuccess: () => {
          setForm({ number: "", password: "" });
          setErrors({});
          navigate("/"); // Redirect to dashboard on success
        },
      });
    }
  };

  return (
    <div>
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="MyPlay Logo" className="h-16 w-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Welcome to <span className="text-green-600">MyPlay</span>
          </h1>
          <p className="text-gray-500">Login to Book Your Spot</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.number
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.number && (
              <p className="text-red-500 text-xs mt-1">{errors.number}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-600 hover:to-green-600 transition"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/user/register"
            className="text-blue-500 hover:underline font-medium"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
