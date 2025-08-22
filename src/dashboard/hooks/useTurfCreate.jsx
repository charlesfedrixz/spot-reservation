import { useMutation } from "@tanstack/react-query";
import { handleCreateTurf } from "../api/apiServices";

export default function useTurfCreate() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => handleCreateTurf(data),
    onSuccess: (data) => {
      console.log(data, "Turf created successfully");
      // You can add any additional logic here, like redirecting or showing a success message
    },
    onError: (error) => {
      console.error("Error creating turf:", error);
      // Handle the error, e.g., show a toast notification
    },
  });
  return { mutate, isPending, isError, error };
}
