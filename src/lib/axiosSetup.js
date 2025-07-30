import axios from "axios";

export const baseUrl =
  import.meta.env.VITE_API_URL || "https://d129b0a6fab9.ngrok-free.app";
// console.log(baseUrl);
export const Axios = axios.create({
  baseURL: baseUrl,
  // headers: {
  //   "ngrok-skip-browser-warning": "true",
  // },
  withCredentials: true,
});
