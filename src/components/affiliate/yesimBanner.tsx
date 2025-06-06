// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const YesimBanner = () => {
  return (
    <div className="w-full py-2 flex justify-center">
      <Link
        href="https://yesim.tp.st/VhVvw6Nw"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/yesim-banner.jpg"
          alt="Yesim eSIM - Global Data Plans"
          width={500}
          height={100}
          priority
        />
      </Link>
    </div>
  );
};

export default YesimBanner;