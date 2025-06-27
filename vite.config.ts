import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["src/playground/**/*"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "EloChat",
      formats: ["es", "umd"],
      fileName: (format) => `elo-chat.${format === "es" ? "js" : "umd.cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
