import React from "react";
import { connection } from 'next/server'
import { posts } from "@/lib/posts";
// import type { Metadata } from "next";
import HomeClient from "@/components/homeClient";
// import { BASE_URL } from "@/lib/config";

export default async function Home() {
  await connection();
  return (
    <HomeClient posts={posts} />
  );
}
