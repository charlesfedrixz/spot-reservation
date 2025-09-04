import { handleLoginFootballTurf } from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLoginForm({ data }, config = {}) {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => handleLoginFootballTurf(data),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },

    ...config,
  });
  return { mutate, isPending, isError, error };
}
