import { handleAuthenticated } from "@/dashboard/api/apiServices";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginAuthenticated() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const email = JSON.parse(localStorage.getItem("email"));
  const navigate = useNavigate();
  const handleChange = (e, idx) => {
    const value = e.target.value.slice(0, 1); // Allow any single character (digit or alphabet)
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < otp.length - 1) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`).focus();
    }
  };
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ otp, email }) => handleAuthenticated({ otp, email }),
    onSuccess: (data) => {
      console.log("Authenticated successfully:", data);
      navigate("/dashboard", { replace: true });
      localStorage.setItem("userInfo", JSON.stringify(data?.data));
      localStorage.removeItem("email");
      toast.success("OTP verified successfully!");
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
      toast.error(error?.response?.data?.message || "Authentication failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // toast.warning(`Entered OTP: ${otpValue}`);
    mutate({ otp: otpValue, email: email }); // Call the mutation with OTP and email
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-8 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Email OTP Verification
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-input-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-xl text-muted-foreground text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              autoFocus={idx === 0}
            />
          ))}
        </div>
        {isError && (
          <div className="text-red-500 mb-4">
            {error?.response?.data?.message ||
              "An error occurred. Please try again."}
          </div>
        )}
        <button
          disabled={isPending}
          type="submit"
          className={`w-full py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow transition ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}
