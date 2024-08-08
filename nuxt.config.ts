import Aura from "@primevue/themes/aura";
import { definePreset } from "@primevue/themes";

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
  },
});

export default defineNuxtConfig({
  imports: {
    autoImport: true,
  },
  app: {
    head: {
      title: "Nuxt App",
    },
    // link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  devtools: { enabled: false },
  css: ["primeicons/primeicons.css"],
  modules: [
    "@primevue/nuxt-module",
    "@nuxt/content",
    "@pinia/nuxt",
    "@nuxt/image",
  ],
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./*"],
      "@path/*": ["./path/*"],
    },
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.GECKO_API_KEY,
    },
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  primevue: {
    options: {
      ripple: true,
      inputVariant: "filled",
      // unstyled: true,
      theme: {
        preset: MyPreset,
        options: {
          prefix: "p",
          darkModeSelector: "light",
          cssLayer: false,
        },
      },
    },
  },
  compatibilityDate: "2024-08-05",
});
