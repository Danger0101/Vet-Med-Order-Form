import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Heroku deployment
  base: process.env.NODE_ENV === "production" ? "/" : "/",

  // GitHub Pages deployment
  // base: "/Vet-Med-Order-Form",
});
