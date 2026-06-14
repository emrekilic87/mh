import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/headerWrapper";
import BackToTop from "@/components/backToTop";
import Footer from "@/components/footer";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import AirhelpBanner from "@/components/affiliate/airhelpBanner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <HeaderWrapper />
          <AirhelpBanner />
            {children}
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootsLayout