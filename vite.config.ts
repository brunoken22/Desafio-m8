import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

export default defineConfig({
   plugins: [reactRefresh()],

   css: {
      modules: {
         scopeBehaviour: "local", // Habilita los módulos CSS
         localsConvention: "camelCaseOnly", // Utiliza camelCase para los nombres de clase generados
         generateScopedName: "[name]__[local]--[hash:base64:5]", // Define el formato del nombre de clase generado
      },
   },
   optimizeDeps: {
      include: ["*.png"], // Incluye los archivos PNG en la optimización de dependencias
      exclude: ["buffer"],
   },

   resolve: {
      alias: [
         {
            find: /^react-mapbox-gl/,
            replacement: "react-mapbox-gl/lib",
         },
         {
            find: /^@img/,
            replacement: path.resolve(__dirname, "./src/img"),
         },
      ],
   },
   base: "./",
   build: {
      outDir: "   dist", // Especifica el nombre del directorio de salida personalizado
      rollupOptions: {
         output: {
            entryFileNames: "bundle.js", // Especifica el nombre del archivo de salida personalizado
         },
         input: {
            main: "index.html",
         },
      },
   },
});
