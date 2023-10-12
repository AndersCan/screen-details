import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  base: "/screen-details/",
  server: {
    https: true,
  },
  plugins: [basicSsl()],
  build: {
    outDir: "dist/",
  },
});
