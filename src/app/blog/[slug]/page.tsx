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
      images: post.image,
      locale: "en_US",
      type: "website",
    },
  };
}

const BlogDetailPage = async(props: { params: Params }) => {
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

      <div className="text-gray-800 dark:text-white leading-7 mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      <Widget
        id="kiwi-search-result-widget"
        scriptSrc="https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&powered_by=true&locale=en&show_header=true&limit=3&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478"
      />
    </div>
  );
}

export default BlogDetailPage;