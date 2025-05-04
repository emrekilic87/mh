"use client";

import React, { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import Pagination from "@/components/pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  summary: string;
  content: string;
  image?: string;
};

export default function HomeClient({ posts }: { posts: Post[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname()
  const currentPage = Number(searchParams.get("page") || 1);
  const postsPerPage = 20;

  const search = searchParams.get("q") || "";

  useEffect(() => {
    const handleSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      const query = customEvent.detail.toLowerCase();
  
      const current = new URLSearchParams(searchParams.toString());
      if (query) {
        current.set("q", query);
        current.set("page", "1");
      } else {
        current.delete("q");
      }
  
      router.push(`${pathname}?${current.toString()}`);
    };
  
    window.addEventListener("search-change", handleSearch);
    return () => window.removeEventListener("search-change", handleSearch);
  }, [searchParams, router, pathname]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedPosts.map((post) => (
          <Card key={post.slug} className="mb-4 h-full flex flex-col justify-between">
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
                priority
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}
            <CardContent>
              <h2 className="text-2xl font-semibold text-center">{post.title}</h2>
              <p className="mt-2 text-gray-700 line-clamp-3">{post.summary}</p>
              <div className="mt-6 mb-6 flex justify-center">
                <Link href={`/blog/${post.slug}`}>
                  <Button className="cursor-pointer">Read More</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
      />
    </main>
  );
}
