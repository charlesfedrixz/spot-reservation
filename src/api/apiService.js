import { Axios } from "@/lib/axiosSetup";

export const handleLoginFootballTurf = async (data) => {
  try {
    const response = await Axios.post("api/user/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const handleSignUpFootballTurf = async (data) => {
  try {
    const response = await Axios.post("api/user/register", data);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const getAllFootballTurfs = async () => {
  try {
    const response = await Axios.get("api/turf/getTurf");
    return response?.data?.data || [];
  } catch (error) {
    console.log("Error fetching turfs:", error);
    throw error;
  }
};

export const handleFilterByDataAndTime = async (date, slotStart, slotEnd) => {
  try {
    const response = await Axios.post(
      `api/turf/getAll?date=${date}&slotStart=${slotStart}&slotEnd=${slotEnd}`
    );
    return response?.data?.data;
  } catch (error) {
    console.log("Error filtered:", error);
    throw error;
  }
};
