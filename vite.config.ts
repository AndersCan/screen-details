import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  base: "/screen-tools/",
  server: {
    https: true,
  },
  plugins: [basicSsl()],
  build: {
    outDir: "dist/",
  },
});
