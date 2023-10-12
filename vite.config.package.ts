// vite.config.ts
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    minify: false,
    outDir: "package",
    lib: {
      entry: {
        ["index.package"]: path.resolve(
          process.cwd(),
          "./src/index.package.ts",
        ),
      },
      formats: ["es", "cjs"],
    },
  },
  plugins: [
    dts({
      exclude: ["./**/*.test.ts", "./**/*.bench.ts", "./**/*element.ts"],
    }),
  ],
});

const root = path.resolve(process.cwd(), "./src/dev");
