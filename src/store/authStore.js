import { handleLoginFootballTurf } from "@/api/apiService";
import { handleLoginAdminDashboard } from "@/dashboard/api/apiServices";
import { useMutation } from "@tanstack/react-query";
import createte from "zustand";

const useAuthStore = createte((set) => ({
  User: null,
  adminUSer: null,
  loading: false,
  error: null,

  loadUser: () => {
    const saveData = localStorage.getItem("user");
    if (saveData) {
      set(() => ({ User: JSON.parse(saveData) }));
    } else {
      set(() => ({ User: null }));
    }
  },
  logout: () => {},

  useUserLogin: () => {
    return useMutation({
      mutationFn: async (data) => {
        const userData = await handleLoginFootballTurf(data);
        return userData;
      },
      onSuccess: (data) => {
        console.log("Login successful:", data);
        set(() => ({ User: data, loading: false, error: null }));
        localStorage.setItem("user", JSON.stringify(data));
      },
      onError: (error) => {
        console.error("Login failed:", error);
        set(() => ({ error: error.message || "Login Failed", loading: false }));
      },
    });
  },

  useAdminLogin: () => {
    return useMutation({
      mutationFn: async () => {
        const userData = await handleLoginAdminDashboard(data);
        return userData;
      },
      onSuccess: (data) => {
        console.log("Login successful:", data);
        set(() => ({ User: data, loading: false, error: null }));
        localStorage.setItem("adminUser", JSON.stringify(data));
      },
      onError: (error) => {
        console.error("Login failed:", error);
        set(() => ({ error: error.message || "Login Failed", loading: false }));
      },
    });
  },
}));

export default useAuthStore;
