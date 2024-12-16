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
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          property: "og:image",
          content: `${process.env.BASE_URL}/og-image.webp`,
        },
        { property: "og:site_name", content: `MrQuizer` },
        { property: "og:url", content: `https://mrquizer.com` },
        { property: "og:type", content: `website` },
        {
          name: "twitter:image",
          content: `${process.env.BASE_URL}/og-image.webp`,
        },
        { name: "twitter:card", content: `summary_large_image` },
        { name: "robots", content: `max-image-preview:large` },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        {
          type: "text/javascript",
          src: `/js/gtag.js`,
          head: true,
          defer: true,
        },
        {
          src: `https://www.googletagmanager.com/gtag/js?id=G-GFEZLZRP5Y`,
          defer: true,
          async: true,
        },
        {
          type: "text/javascript",
          src: `/js/gana.js`,
          defer: true,
        },
      ],
      noscript: [
        {
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5XK8KVP5" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
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
  build: { transpile: ["@nuxtjs/tailwindcss"] },
});
