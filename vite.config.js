/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { root } from "postcss";

const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  // base: "/client-ojs/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTest.js",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
  server: {
    host: "127.0.0.1",
    // port: 8000,
    port: 4173,
  },
  // build: {
  //   outDir: outDir,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       login: resolve(__dirname, './login/index.html'),
  //       code: resolve(__dirname, './code/index.html'),
  //       profile: resolve(__dirname, './profile/index.html'),
  //       problems : resolve(__dirname, './dashboard/problems/index.html'),
  //       solutions : resolve(__dirname, './dashboard/solutions/index.html'),
  //       users : resolve(__dirname, './dashboard/users/index.html')
  //     }
  //   }
  // }
  // build: {
  //   outDir: outDir,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, 'index.html'),
  //       login: resolve(__dirname, './src/pages/login/index.html'),
  //       code: resolve(__dirname, './src/pages/code/index.html'),
  //       profile: resolve(__dirname, './src/pages/profile/index.html'),
  //       problems : resolve(__dirname, './src/pages/admin/problems/problem/index.html'),
  //       addProblem : resolve(__dirname, './src/pages/admin/problems/addProblem/index.html'),
  //       detailProblem : resolve(__dirname, './src/pages/admin/problems/detail/index.html'),
  //       users : resolve(__dirname, './src/pages/admin/users/index.html')
  //     }
  //   }
  // }
});
