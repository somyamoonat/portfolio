import type { MetadataRoute } from "next";
import { profileData } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${profileData.personal.domain}/sitemap.xml`,
  };
}
