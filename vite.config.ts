import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default defineConfig({
   plugins: [react()],

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
         // ...
         {
            find: /^react-mapbox-gl/,
            replacement: "react-mapbox-gl/lib",
         },
      ],
   },
});
