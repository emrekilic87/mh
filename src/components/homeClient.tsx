"use client";

import React, { useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import Pagination from "@/components/pagination";
import { useRouter, usePathname } from "next/navigation";

type Post = {
  slug: string;
  title: string;
  summary: string;
  image?: string;
};

type HomeClientProps = {
  posts: Post[];
  currentPage: number;
  search: string;
};

export default function HomeClient({ posts, currentPage, search }: HomeClientProps) {
  const router = useRouter();
  const pathname = usePathname()
  const postsPerPage = 20;

  useEffect(() => {
    const handleSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      const query = customEvent.detail.toLowerCase();
  
      const current = new URLSearchParams();
      if (currentPage > 1) current.set("page", String(currentPage));
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
  }, [currentPage, router, pathname]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    ).reverse();
  }, [search, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="max-w-4xl mx-auto px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="feed">
        {paginatedPosts.map((post) => (
          <article key={post.slug} className="mb-4 h-full flex flex-col justify-between">
            <Card className="h-full flex flex-col justify-between overflow-hidden">
              {post.image && (
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={300}
                    sizes="(min-width: 896px) 420px, (min-width: 768px) calc(50vw - 28px), calc(100vw - 32px)"
                    priority={currentPage === 1} 
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </Link>
              )}
              <CardContent>
                <h2 className="text-2xl font-semibold text-center">{post.title}</h2>
                <p className="mt-2 text-gray-700 dark:text-white line-clamp-3">{post.summary}</p>
                <div className="mt-6 mb-6 flex justify-center">
                  <Link href={`/blog/${post.slug}`}>
                    <Button className="cursor-pointer bg-gray-700 dark:bg-white text-white dark:text-gray-700 transition-all duration-200 hover:bg-gray-900 dark:hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md">Read More</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center text-black-500 py-10 min-h-screen text-2xl">No articles were found</p>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          search={search}
        />
      )}
    </main>
  );
}
