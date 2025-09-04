import { getAllFootballTurfs } from "@/api/apiService";
import { useQuery } from "@tanstack/react-query";

export const useFetchTurf = () => {
  const {
    data: turfs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["turfs"],
    queryFn: getAllFootballTurfs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
  });

  return { data: turfs, isLoading, isError };
};
