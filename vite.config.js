import fs from "fs";
import lightswindPlugin from "lightswind/plugin.js";
import path from "path";
import { defineConfig } from "vite";
// export const ngrokDomain = import.meta.env.VITE_API_URL;
// https://vite.dev/config/
export default defineConfig({
  plugins: [lightswindPlugin()],
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
    host: "0.0.0.0",
    hmr: {
      host: "76ed55ba296e.ngrok-free.app", // <-- your ngrok domain
      protocol: "wss",
      clientPort: 443, // ngrok HTTPS/WebSocket port
    },
  },
  // server: {
  //   https: {
  //     key: fs.readFileSync("./certificates/localhost-key.pem"),
  //     cert: fs.readFileSync("./certificates/localhost.pem"),
  //   },
  // },
});
