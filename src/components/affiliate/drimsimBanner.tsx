// components/YesimBanner.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

const DrimsimBanner = () => {
  return (
    <div className="w-full py-2 flex justify-center">
      <Link
        href="https://drimsim.tp.st/LBNGqOFN"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/drimsim-banner.jpg"
          alt="Drimsim eSIM"
          width={500}
          height={100}
          priority
        />
      </Link>
    </div>
  );
};

export default DrimsimBanner;