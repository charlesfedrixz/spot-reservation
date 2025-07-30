import { Axios } from "@/lib/axiosSetup";

export const handleLoginAdminDashboard = async (data) => {
  try {
    const response = await Axios.post("api/admin/login", data);
    return response?.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
export const handleAuthenticated = async (data) => {
  try {
    const response = await Axios.post("api/admin/verifyOTP", data);
    return response?.data;
  } catch (error) {
    console.error("Error checking authentication:", error);
    throw error;
  }
};

export const handleAdminLogout = async () => {
  try {
    const response = await Axios.post("api/admin/logout");
    return response?.data;
  } catch (error) {
    console.log("Error logging out:", error);
    throw error;
  }
};
export const handleCreateTurf = async (data) => {
  try {
    const response = await Axios.post("/api/turf/create", data);
    return response?.data;
  } catch (error) {
    console.error("Error creating turf:", error);
    throw error;
  }
};

export const handleGetAllTurfsList = async () => {
  try {
    const response = await Axios.get("api/turf/getTurf");
    return response?.data;
  } catch (error) {
    console.error("Error fetching turfs:", error);
    throw error;
  }
};
