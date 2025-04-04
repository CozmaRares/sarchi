import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
    }),
    tailwindcss(),
  ],
});
