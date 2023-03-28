import React from "react";
import Image from "next/image";

export default function ListLayout({ children }) {
  return (
    <>
      <div className="absolute top-0 w-full h-96 bg-black">
        <Image
          priority
          alt="background image"
          src="/images/hero.png"
          fill
          className="z-0 object-cover"
        />
      </div>
      <div className="mt-28 mx-3 mb-12 md:w-[780px] md:mx-auto relative">
        {children}
      </div>
    </>
  );
}
