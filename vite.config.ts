import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [/\.tsx?$/],
      imports: ["react"],
      dirs: ["./src/components/**"],
      dts: "./auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});
