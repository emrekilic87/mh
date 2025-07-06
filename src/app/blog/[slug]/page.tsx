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
        id="hotel-look-widget"
        scriptSrc="https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&show_hotels=false&powered_by=true&locale=en&searchUrl=search.hotellook.com&primary_override=%23FF8E01&color_button=%23FF8E01&color_icons=%23FF8E01&secondary=%23FFFFFF&dark=%23262626&light=%23FFFFFF&special=%23C4C4C4&color_focused=%23FF8E01&border_radius=5&plain=false&promo_id=7873&campaign_id=101"
      />

      <div className="text-gray-800 leading-7 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      <Widget
        id="kiwi-taxi-widget"
        scriptSrc="https://tpwgt.com/content?trs=414250&powered_by=true&shmarker=629078&language=en&display_currency=USD&transfer_type=any&hide_form_extras=false&hide_external_links=false&disable_currency_selector=false&campaign_id=1&promo_id=691"
      />
    </div>
  );
}
