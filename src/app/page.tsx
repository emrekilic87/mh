import React from "react";
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import HomeClient from "@/components/homeClient";
import { BASE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Multi Hats - Travel Blog for Curious Explorers",
  description:
    "Multi Hats is an travel blog that shares travel guides, itineraries, and tips for modern explorers who want to experience the world.",
  keywords: ["travel", "solo travel", "backpacking", "digital nomad", "travel tips", "travel itineraries", "world exploration", "destination guides"],
  authors: [{ name: "Multi Hats" }],
  openGraph: {
    title: "Multi Hats - Travel Blog for Curious Explorers",
    description:
      "Explore travel guides, tips, and inspiring stories for adventurers around the globe.",
    url: `${BASE_URL}`,
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return <HomeClient posts={posts} />;
}
