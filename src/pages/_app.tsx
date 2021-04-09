import "../styles/globals.css";
import React, { useEffect } from "react";
import type { AppProps /*, AppContext */ } from "next/app";
import AOS from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
