// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AirhelpBanner = () => {
  return (
    <div className="w-full py-2 flex justify-center">
      <Link
        href="https://airhelp.tp.st/8pFNHmjF"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/airhelp-banner.png"
          alt="Air Help"
          width={500}
          height={100}
          priority
        />
      </Link>
    </div>
  );
};

export default AirhelpBanner;