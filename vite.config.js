import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "app",
  server: {
    proxy:{
      "/centwise": "http://localhost:3000/",
    }
  }
});