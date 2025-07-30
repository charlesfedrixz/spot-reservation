import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleCreateTurf } from "../api/apiServices";

export default function useTurfCreate() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => handleCreateTurf(data),
    onSuccess: (data) => {
      console.log(data, "Turf created successfully");
      navigate("/dashboard/turf-management");
      toast.success("Turf created successfully!");
    },
    onError: (error) => {
      console.error("Error creating turf:", error);
      toast.error(error?.response?.data?.message || "Failed to create turf");
    },
  });
  return { mutate, isPending, isError, error };
}
