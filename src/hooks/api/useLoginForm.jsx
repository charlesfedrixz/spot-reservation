import { handleLoginFootballTurf } from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";

export default function useLoginForm({ data }, config = {}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => handleLoginFootballTurf(data),
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
    ...config,
  });
  return { mutate, isPending, isError, error };
}
