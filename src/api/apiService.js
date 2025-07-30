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
