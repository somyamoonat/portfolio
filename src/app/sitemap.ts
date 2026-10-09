import type { MetadataRoute } from "next";
import { profileData } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${profileData.personal.domain}`;

  const projectEntries: MetadataRoute.Sitemap = profileData.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: "2026-10-09",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-09",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
