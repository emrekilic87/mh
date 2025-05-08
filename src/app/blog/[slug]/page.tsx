import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "@/lib/config";

type Props = {
  params: { slug: string };
};

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `${BASE_URL}/blog/${slug}`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function BlogDetailPage(props: { params: Params }) {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <div id="detail-page" className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">{post.title}</h1>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={300}
          height={600}
          priority={true}
          className="w-full object-cover mb-6"
        />
      )}
      <div className="text-gray-800 leading-7 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
