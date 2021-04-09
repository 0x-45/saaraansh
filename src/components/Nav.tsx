import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="md:flex-row flex flex-col items-center justify-between p-3 px-10">
      <div className="text-5xl font-bold text-red-600 uppercase">
        <Link href="/">Saaransh</Link>
      </div>
      <div className="flex flex-row">
        <Link href="/">
          <div className="nav-pill">HOME</div>
        </Link>
        <Link href="/tool">
          <div className="nav-pill">TOOL</div>
        </Link>
        <Link href="/about">
          <div className="nav-pill">ABOUT</div>
        </Link>
      </div>
    </div>
  );
};
