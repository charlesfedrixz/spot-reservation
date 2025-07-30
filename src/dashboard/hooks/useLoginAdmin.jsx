import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLoginAdminDashboard } from "../api/apiServices";

export default function useLoginAdmin(config = {}) {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleLoginAdminDashboard,

    onSuccess: (data) => {
      console.log(data, "userInfo");

      navigate("/auth/authenticated", { replace: true });
      localStorage.setItem("email", JSON.stringify(data?.data)); // Redirect to dashboard on success
      toast.success(
        `Login successful as ${role === "admin" ? "Admin" : "Super Admin"}`
      );
    },
    onError: (error) => {
      console.error("Login failed:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    },
    ...config,
  });
  return { mutate, isPending, isError, error };
}
