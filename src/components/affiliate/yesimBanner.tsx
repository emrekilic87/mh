// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const YesimBanner = () => {
  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <Link
        href="https://yesim.tp.st/VhVvw6Nw"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-[500px]"
      >
        <Image
          src="/images/yesim-banner.jpg"
          alt="Yesim eSIM - Global Data Plans"
          width={500}
          height={267}
          sizes="(min-width: 532px) 500px, calc(100vw - 32px)"
          className="w-full h-auto"
          priority
        />
      </Link>
    </div>
  );
};

export default YesimBanner;