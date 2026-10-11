import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { siteMetadata } from "@/lib/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.siteUrl;

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
