import { defineConfig } from "astro/config";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@astrojs/react";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      apiOptions: {
        region: "",
      },
      bridge: {
        customParent: "https://app.storyblok.com",
      },
      components: {
        page: "storyblok/Page",
        Project: "storyblok/Project",
        Hero: "storyblok/Hero",
        CvEntry: "storyblok/CvEntry",
        CvSection: "storyblok/CvSection",
        TextBlock: "storyblok/TextBlock",
        TwoColumnBlock: "storyblok/TwoColumnBlock",
        ImageBlock: "storyblok/ImageBlock",
        VideoBlock: "storyblok/VideoBlock",
        FeaturedProject: "storyblok/FeaturedProject",
        CVGroupEntry: "storyblok/CVGroupEntry"
      },
    }),
    tailwind(),
    react(),
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
});
