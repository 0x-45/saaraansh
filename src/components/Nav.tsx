import React from "react";
import Link from "next/link";

export const Nav = () => {
  return (
    <div className="flex flex-col items-center justify-between p-3 px-10 md:flex-row">
      <div className="text-5xl font-bold text-red-500 uppercase">
        <Link href="/">
          <div className="text-4xl text-red-500">Saaraansh</div>
        </Link>
      </div>
      <div className="flex flex-row">
        <Link href="/">
          <div className="flex flex-row items-center justify-center px-6 py-2 m-2 text-center border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 hover:text-white hover:border-white">
            HOME
          </div>
        </Link>
        <Link href="/tool">
          <div className="flex flex-row items-center justify-center px-6 py-2 m-2 text-center border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 hover:text-white hover:border-white">
            TOOL
          </div>
        </Link>
        <Link href="/about">
          <div className="flex flex-row items-center justify-center px-6 py-2 m-2 text-center border-2 border-black rounded-lg cursor-pointer hover:bg-red-500 hover:text-white hover:border-white">
            ABOUT
          </div>
        </Link>
      </div>
    </div>
  );
};
