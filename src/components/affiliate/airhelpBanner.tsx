// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AirhelpBanner = () => {
  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <Link
        href="https://airhelp.tp.st/8pFNHmjF"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-[500px]"
      >
        <Image
          src="/images/air-help-banner.png"
          alt="Air Help"
          width={500}
          height={273}
          sizes="(min-width: 532px) 500px, calc(100vw - 32px)"
          className="w-full h-auto"
          priority
        />
      </Link>
    </div>
  );
};

export default AirhelpBanner;