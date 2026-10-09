import type { MetadataRoute } from "next";
import { profileData } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${profileData.personal.domain}`;
  const now = new Date();

  const projectEntries: MetadataRoute.Sitemap = profileData.projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
