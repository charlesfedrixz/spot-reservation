import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// export const ngrokDomain = import.meta.env.VITE_API_URL;
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    postcss: "./postcss.config.js"
  },
  optimizeDeps:{
    exclude: ['react-day-picker']
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"), // Maps "@" to "./src"
    },
  },
  server: {
    https: {
      key: fs.readFileSync("./cert/key.pem"),
      cert: fs.readFileSync("./cert/cert.pem"),
    },
    port: 3000,
    host: "0.0.0.0",
    hmr: {
      host: "76ed55ba296e.ngrok-free.app", // <-- your ngrok domain
      protocol: "wss",
      clientPort: 443, // ngrok HTTPS/WebSocket port
    },
  },
});
