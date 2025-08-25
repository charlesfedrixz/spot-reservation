import useSignUpForm from "@/hooks/api/useSignUpForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/favicon/searchMyPlay.png";
const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    if (!form.name) {
      errs.name = "Name is required";
    } else if (form.name.length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Email is invalid";
    }

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

    // if (!form.confirmPassword) {
    //   errs.confirmPassword = "Please confirm your password";
    // } else if (form.password !== form.confirmPassword) {
    //   errs.confirmPassword = "Passwords do not match";
    // }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const { mutate, isPending } = useSignUpForm({ data: form });

  const handleSubmit = () => {
    if (validate()) {
      mutate(undefined, {
        onSuccess: () => {
          setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({});
          // Redirect to login or dashboard on success
        },
      });
      // Call register function here later
      console.log("Registration data:", form);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
      <div className="mb-6 text-center">
        {/* Added logo */}
        <img
          src={logo}
          alt="MyPlay Logo"
          className="mx-auto h-16 w-auto mb-4"
        />
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Join <span className="text-green-600">MyPlay</span>
        </h1>
        <p className="text-gray-500">Create Your Account to Get Started</p>
      </div>
      {/* Rest of the form remains unchanged */}
      <div className="space-y-4">
        {/* Name, Email, and Phone fields remain unchanged */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-2 rounded-lg shadow hover:from-blue-600 hover:to-green-600 transition mt-6"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?
        <Link
          to="/user/login"
          className="text-blue-500 hover:underline font-medium"
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
