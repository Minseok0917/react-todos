import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

const resolveAlias = Object.fromEntries(
  Object.entries({
    "@": "./src",
  }).map(([key, value]) => [key, path.resolve(__dirname, value)])
);

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [/\.tsx?$/],
      imports: ["react"],
      dirs: ["./src/components/@share/**"],
      dts: "./auto-imports.d.ts",
      eslintrc: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: resolveAlias,
  },
});
