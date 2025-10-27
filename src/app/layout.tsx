import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/headerWrapper";
import BackToTop from "@/components/backToTop";
import Footer from "@/components/footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import DrimsimBanner from "@/components/affiliate/drimsimBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <HeaderWrapper />
        <DrimsimBanner />
        {children}
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
