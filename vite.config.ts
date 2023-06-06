import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";
export default defineConfig({
   plugins: [react()],
   esbuild: {
      jsxInject: `import 'buffer';`,
   },
   define: {
      "process.env": {},
   },
   css: {
      modules: {
         scopeBehaviour: "local", // Habilita los módulos CSS
         localsConvention: "camelCaseOnly", // Utiliza camelCase para los nombres de clase generados
         generateScopedName: "[name]__[local]--[hash:base64:5]", // Define el formato del nombre de clase generado
      },
   },
   optimizeDeps: {
      include: ["*.png"], // Incluye los archivos PNG en la optimización de dependencias
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
