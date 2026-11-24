// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AFFILIATE_REL } from "@/lib/affiliate";

const YesimBanner = () => {
  return (
    <div className="w-full px-4 py-6 flex flex-col items-center">
      <Link
        href="https://yesim.tp.st/VhVvw6Nw"
        target="_blank"
        rel={AFFILIATE_REL}
        className="block w-full max-w-[500px]"
      >
        <Image
          src="/images/yesim-banner.jpg"
          alt="Yesim eSIM - Global Data Plans"
          width={500}
          height={267}
          sizes="(min-width: 532px) 500px, calc(100vw - 32px)"
          className="w-full h-auto"
        />
      </Link>
      <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
        This is an affiliate link. We may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
};

export default YesimBanner;