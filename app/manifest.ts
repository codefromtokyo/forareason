import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "For a Reason",
    short_name: "For a Reason",
    description: "Break the language gap, together. Learn what a new country asks of you, for a reason.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F1F4F9",
    theme_color: "#1D4BA8",
    orientation: "portrait",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
