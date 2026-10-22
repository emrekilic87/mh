import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/headerWrapper";
import BackToTop from "@/components/backToTop";
import Footer from "@/components/footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import PackingGuideBanner from "@/components/affiliate/packingGuideBanner";
import { ThemeProvider } from "@/components/theme-provider";
import { siteMetadata } from "@/lib/siteMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
  metadataBase: new URL(siteMetadata.siteUrl),

};

// Site geneli yapılandırılmış veri; sameAs ile sosyal profiller siteye bağlanır
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    logo: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
    email: siteMetadata.email,
    sameAs: [siteMetadata.instagram, siteMetadata.youtube],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: siteMetadata.author },
  },
];

interface RootsLayoutProps {
  children: React.ReactNode;
}

const RootsLayout = ({ children }: RootsLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <link rel="icon" href="/images/multihats.png" type="image/png" sizes="32x32" />
      <head>
      <Script
          id="travelpayouts-script"
          data-noptimize="1"
          data-cfasync="false"
          data-wpfc-render="false"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = "https://tp-em.cc/NDE0MjUw.js?t=414250";
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <GoogleAnalytics gaId="G-FVTNCZ7LSF" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <HeaderWrapper />
          <PackingGuideBanner />
            {children}
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootsLayout