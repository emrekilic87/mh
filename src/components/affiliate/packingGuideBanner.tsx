import React from "react";
import Link from "next/link";
import Image from "next/image";

const PackingGuideBanner = () => {
  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <Link
        href="https://emrekilic2.gumroad.com/l/jowxtq"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-[500px]"
      >
        <Image
          src="/images/packing-essentials-banner.png"
          alt="The Traveler's Packing Essentials: Complete Packing Guide + 5 Printable Checklists"
          width={500}
          height={273}
          sizes="(min-width: 532px) 500px, calc(100vw - 32px)"
          className="w-full h-auto"
          loading="eager"
        />
      </Link>
    </div>
  );
};

export default PackingGuideBanner;
