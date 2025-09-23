import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "@/lib/config";
import Widget from "@/components/affiliate/widget";
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

      <Widget
        id="kiwi-flights-widget"
        scriptSrc="https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&locale=en&stops=any&show_hotels=false&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111"
      />

      <div className="text-gray-800 leading-7 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      <Widget
        id="kiwi-taxi-widget"
        scriptSrc="https://tpwgt.com/content?currency=USD&trs=414250&shmarker=629078&language=en&theme=1&powered_by=true&campaign_id=1&promo_id=1486"
      />
    </div>
  );
}
