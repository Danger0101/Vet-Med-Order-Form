import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Vet-Med-Order-Form/", // This is needed for GitHub Pages
});
