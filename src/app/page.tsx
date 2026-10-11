import React from "react";
import { connection } from 'next/server'
import { posts } from "@/lib/posts";
import type { Metadata } from "next";
import HomeClient from "@/components/homeClient";
import { siteMetadata } from "@/lib/siteMetadata";

type SearchParams = Promise<{ page?: string; q?: string }>

export async function generateMetadata(props: { searchParams: SearchParams }): Promise<Metadata> {
  const { page, q } = await props.searchParams;

  // Arama sonuçları indexlenmesin
  if (q) {
    return {
      alternates: { canonical: "/" },
      robots: { index: false, follow: true },
    };
  }

  // Sayfalama sayfalarının canonical'ı aşağıda basılıyor; Next.js kök yoldaki query'yi canonical'dan siliyor
  if (Number(page) > 1) return {};

  return {
    alternates: { canonical: "/" },
  };
}

export default async function Home(props: { searchParams: SearchParams }) {
  await connection();
  const { page, q } = await props.searchParams;
  const pageNumber = Number(page) > 1 ? Math.floor(Number(page)) : 1;

  return (
    <>
      {!q && pageNumber > 1 && (
        <link rel="canonical" href={`${siteMetadata.siteUrl}/?page=${pageNumber}`} />
      )}
      <HomeClient posts={posts} currentPage={pageNumber} search={q || ""} />
    </>
  );
}
