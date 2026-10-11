import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCountryPost, getRelatedPosts, renderPostContent } from "@/lib/destinations";
import Widget from "@/components/affiliate/widget";
import ShareButtons from "@/components/shareButtons";
import { siteMetadata } from "@/lib/siteMetadata";
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
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        "x-default": `/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `/blog/${slug}`,
      images: post.image,
      locale: "en_US",
      type: "article",
    },
  };
}

const BlogDetailPage = async(props: { params: Params }) => {
  const params = await props.params;
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  const countryPost = getCountryPost(post);
  const relatedPosts = getRelatedPosts(post);

  const postUrl = `${siteMetadata.siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image ? `${siteMetadata.siteUrl}${post.image}` : undefined;
  const breadcrumbs = [
    { name: "Home", url: siteMetadata.siteUrl },
    ...(countryPost ? [{ name: countryPost.title, url: `${siteMetadata.siteUrl}/blog/${countryPost.slug}` }] : []),
    { name: post.title, url: postUrl },
  ];
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: `${post.title} Travel Guide`,
      description: post.summary,
      image: imageUrl,
      url: postUrl,
      mainEntityOfPage: postUrl,
      keywords: post.keywords,
      inLanguage: "en",
      author: { "@type": "Organization", name: siteMetadata.author, url: siteMetadata.siteUrl },
      publisher: {
        "@type": "Organization",
        name: siteMetadata.author,
        url: siteMetadata.siteUrl,
        logo: { "@type": "ImageObject", url: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ];

  return (
    <div id="detail-page" className="max-w-4xl mx-auto p-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          {countryPost && (
            <li>› <Link href={`/blog/${countryPost.slug}`} className="hover:underline">{countryPost.title}</Link></li>
          )}
          <li aria-current="page">› {post.title}</li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-6 text-center">{post.title}</h1>

      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={1280}
          height={853}
          sizes="(min-width: 896px) 864px, calc(100vw - 32px)"
          priority={true}
          className="w-full object-cover mb-6"
        />
      )}

      <Widget
        id="kiwi-flights-widget"
        scriptSrc="https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&locale=en&stops=any&show_hotels=false&powered_by=true&border_radius=0&plain=true&color_button=%2300A991&color_button_text=%23ffffff&promo_id=3414&campaign_id=111"
      />

      <div className="post-content text-gray-800 dark:text-white leading-7 mb-6" dangerouslySetInnerHTML={{ __html: renderPostContent(post) }} />

      <ShareButtons url={postUrl} title={`${post.title} Travel Guide | Multi Hats`} image={imageUrl} />

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-destinations" className="mt-10 mb-6">
          <h2 id="related-destinations">Related Destinations</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link href={`/blog/${related.slug}`} className="group block">
                  {related.image && (
                    <Image
                      src={related.image}
                      alt={`${related.title} travel guide`}
                      width={300}
                      height={180}
                      sizes="(min-width: 896px) 280px, (min-width: 768px) calc(33vw - 21px), calc(50vw - 24px)"
                      className="w-full h-28 object-cover rounded-lg"
                    />
                  )}
                  <span className="block mt-2 font-semibold group-hover:underline">{related.title} Travel Guide</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Widget
        id="kiwi-search-result-widget"
        scriptSrc="https://tpwgt.com/content?currency=usd&trs=414250&shmarker=629078&powered_by=true&locale=en&show_header=true&limit=3&primary_color=00AE98&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478"
      />
    </div>
  );
}

export default BlogDetailPage;