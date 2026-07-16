import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AdmitGPT — College Admissions Chance Calculator",
    short_name: "AdmitGPT",
    description:
      "Free, open-source AI college admissions probability calculator. Predict your Ivy League, MIT, and Stanford chances from SAT, ACT, GPA, and extracurriculars.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090c",
    theme_color: "#08090c",
    categories: ["education", "productivity", "utilities"],
    lang: "en-US",
    icons: [
      {
        src: "/assets/AdmitGPT.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/AdmitGPT.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
