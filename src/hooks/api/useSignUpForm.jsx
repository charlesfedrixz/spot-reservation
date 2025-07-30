import { handleSignUpFootballTurf } from "@/api/apiService";
import { useMutation } from "@tanstack/react-query";

export default function useSignUpForm({ data }, config = {}) {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: () => handleSignUpFootballTurf(data),
    onSuccess: (data) => {
      console.log("Sign up successful:", data);
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
    },
    ...config,
  });
  return { mutate, isPending, isError, error };
}
