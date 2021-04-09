import Link from "next/link";
import React, { useEffect } from "react";

import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title={"Home"}>
      <div className="md:flex-row md:pt-10 flex flex-col justify-center min-w-full min-h-screen">
        {/* <img src="thumbnail.png" alt="Saaransh Logo and moto" /> */}

        <div className="md:pt-10 md:w-3/4 relative flex flex-row justify-center">
          <img
            data-aos="zoom-in"
            className="filter hue-rotate-0 self-start w-3/4"
            src="./img1.jpg"
          />

          <img
            data-aos="fade-right"
            className="top-96 left-3/4 md:block absolute hidden w-1/2"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8a/ContractLaw.jpg"
          />
        </div>

        <div className="flex flex-col">
          <div
            data-aos="fade-up"
            className="md:pt-10 md:w-2/4 flex flex-col self-start p-10 mt-5">
            <div className="text-4xl text-red-500">Saaransh</div>
            <div className="font-extralight mb-2 text-xl leading-relaxed">
              India has one the highest adult illiteracy rates, and even the
              educated can find themselves in financial illiteracy. This can
              lead to legal as well as subsequent financial traps. Saaraansh is
              a web app that helps you analyse the contents of lengthy legal
              documents to move ahead with an informed mindset.
            </div>
            <Link href="/tool">
              <button className="w-1/2 py-2 mx-auto font-bold text-white bg-red-500">
                TOOL
              </button>
            </Link>
          </div>

          <div className="md:justify-end flex flex-row items-end self-end justify-center p-10">
            <img data-aos="zoom-in" className="" src="./img2.jpg" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
