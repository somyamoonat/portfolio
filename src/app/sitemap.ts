import type { MetadataRoute } from "next";
import { profileData } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${profileData.personal.domain}`;

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-09",
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
