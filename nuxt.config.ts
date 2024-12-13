// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: { static: true },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
    },
  },
  routeRules: {
    "*": { prerender: true },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@nuxt/fonts",
  ],
  css: ["~/assets/css/tailwind.css"],
  shadcn: { prefix: "", componentDir: "./components/ui" },
  image: { quality: 80, format: ["webp"] },
});
