// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
    
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.svg" }],
    },
  },
  modules: ["@pinia/nuxt"],
});
