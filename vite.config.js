import react from "@vitejs/plugin-react";
import fs from "fs";
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
    https: {
      key: fs.readFileSync("./cert/key.pem"),
      cert: fs.readFileSync("./cert/cert.pem"),
    },
    port: 3000,
    host: "localhost",
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync("./certificates/localhost-key.pem"),
  //     cert: fs.readFileSync("./certificates/localhost.pem"),
  //   },
  // },
});
