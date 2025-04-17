import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  // Ensure this is correct depending on your deployment path
  base: "/", // Use '/' for root or './' for a subfolder

  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // Proxy API requests to your backend during local development
      "/project-management/v1": {
        target: "http://localhost:3000", // Change this URL to your backend API in production
        changeOrigin: true,
        secure: false,
      },
    },
  },

  resolve: {
    alias: {
      // Alias for cleaner imports
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    // This ensures you're building for modern browsers
    target: "esnext", // For modern browsers with ES Modules support
    // outDir: "client/dist", // Adjust your output directory if needed
  },
});
