import React, { useEffect } from "react";
import { Layout } from "../components/Layout";

export default function Home() {
  return (
    <Layout title={"Home"}>
      <div className="flex flex-col justify-center min-w-full min-h-screen md:flex-row md:pt-10">
        {/* <img src="thumbnail.png" alt="Saaransh Logo and moto" /> */}

        <div className="relative flex flex-row justify-center md:pt-10 md:w-3/4">
          <img
            data-aos="zoom-in"
            className="self-start w-3/4 filter hue-rotate-0"
            src="./img1.jpg"
          />

          <img
            data-aos="fade-right"
            className="absolute hidden w-1/2 top-96 left-3/4 md:block"
            src="https://upload.wikimedia.org/wikipedia/commons/8/8a/ContractLaw.jpg"
          />
        </div>

        <div className="flex flex-col">
          <div
            data-aos="fade-up"
            className="flex flex-col self-start p-10 mt-5 md:pt-10 md:w-2/4">
            <div className="text-4xl">Heading</div>
            <div className="text-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo, rerum maxime expedita hic a nulla dolores natus dicta
              error porro ipsa, nostrum ad laudantium necessitatibus aliquid
              delectus minima accusamus voluptatem.
            </div>
            <button className="font-bold text-white bg-red-500">TOOL</button>
          </div>

          <div className="flex flex-row items-end self-end justify-center p-10 md:justify-end">
            <img data-aos="zoom-in" className="" src="./img2.jpg" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
