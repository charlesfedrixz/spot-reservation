import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Maps "@" to "./src"
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://d129b0a6fab9.ngrok-free.app",
        changeOrigin: true,
        secure: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      },
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync("./certificates/localhost-key.pem"),
  //     cert: fs.readFileSync("./certificates/localhost.pem"),
  //   },
  // },
});
