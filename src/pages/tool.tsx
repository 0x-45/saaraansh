import { FormEvent, useState } from "react";
import { Layout } from "../components/Layout";

export default function Tool() {
  const scores = {
    "P+": "strong positive",
    P: "positive",
    NEU: "neutral",
    N: "negative",
    "N+": "strong negative",
    NONE: "without polarity",
  };
  const languages = {
    en: "English",
    ar: "Arabic",
    zh: "Chinese",
    fr: "French",
    de: "German",
    hi: "Hindi",
    ga: "Irish",
    it: "Italian",
    ja: "Japanese",
    ko: "Korean",
    pt: "Portuguese",
    ru: "Russian",
    es: "Spanish",
  };
  const [summarised, setSummarised] = useState<string>(
    "Summarised Text appear here"
  );
  const [hasSummed, setHasSummed] = useState<boolean>(false);
  const [language, setLanguage] = useState("hi");
  const [translated, setTranslated] = useState<string>(
    "Translated Text appear here"
  );
  const [sentiment, setSentiment] = useState({
    score_tag: [
      "score_tag_here",
      "Polarity of the element it refers to: global polarity",
    ],
    agreement: [
      "agreement_here",
      "Marks the agreement between the sentiments detected in the text, the sentence or the segment it refers to",
    ],
    subjectivity: ["subjectivity_here", "Marks the subjectivity of the text. "],
    confidence: [
      "confidence_here",
      "Represents the confidence associated with the sentiment analysis performed on the text.",
    ],
    irony: ["irony_here", "Indicates the irony of the text."],
  });

  const [summaryOrTranslated, setSummaryOrTranslated] = useState<boolean>(true);
  const [userText, setuserText] = useState<string>("");
  const [userLines, setUserLines] = useState<number>(10);
  const [hasSentiment, setHasSentiment] = useState<boolean>(false);

  const handleSentiment = async () => {
    const formdata = new FormData();
    formdata.append("key", "8b363898e680795f1bee36c2e1c5265e");
    formdata.append(
      "txt",
      summarised
        .replace(/\[...\]/gi, " ")
        .replaceAll("-", "")
        .replaceAll("\n", " ")
    );
    formdata.append("lang", "en");

    // const requestOptions = {};

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.json())
      // .then(data => console.log(data.status, data.body))
      .catch((error) => console.log("error", error));
    // const body = await response;
    const { score_tag, agreement, subjectivity, confidence, irony } = response;
    setSentiment({
      score_tag: [
        score_tag,
        "Polarity of the element it refers to: global polarity",
      ],
      agreement: [
        agreement,
        "Marks the agreement between the sentiments detected in the text, the sentence or the segment it refers to",
      ],
      subjectivity: [subjectivity, "Marks the subjectivity of the text. "],
      confidence: [
        confidence,
        "Represents the confidence associated with the sentiment analysis performed on the text.",
      ],
      irony: [irony, "Indicates the irony of the text."],
    });
    console.log(response);
  };

  const handleSummarise = async () => {
    setSummarised("Loading Summary...");
    try {
      let sum = await fetch(
        `https://api.meaningcloud.com//summarization-1.0?key=${"8b363898e680795f1bee36c2e1c5265e"}&txt=${userText}&sentences=${userLines}`,
        {
          method: "POST",
        }
      ).then((sum) => sum.json());
      console.log(sum);
      setSummarised(sum.summary);
      setSummaryOrTranslated(true);
      setHasSummed(true);
      handleSentiment();
    } catch (error) {
      console.log(error);
      setSummarised("An error occured, text not supported");
    }
  };

  const handleTranlate = async () => {
    setTranslated("Loading Translation...");
    try {
      let translated = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
          q: summarised
            .replace(/\[...\]/gi, " ")
            .replaceAll("-", "")
            .replaceAll("\n", " "),
          source: "en",
          target: language,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((data) => data.json());

      // translated = await translated.json()
      console.log(translated);
      setTranslated(translated.translatedText);
      setSummaryOrTranslated(false);
    } catch (error) {
      console.log(error);
      setTranslated("An error occured, could not translate.");
    }
  };

  return (
    <Layout title="Tool">
      <main className="flex flex-wrap max-h-screen">
        <div className="flex flex-col items-center max-h-full p-4 sm:w-full lg:w-1/2">
          <textarea
            value={userText}
            onChange={(e) => setuserText(e.target.value)}
            className="w-full p-6 mb-4 border-2 focus:outline-none max-h-96 "
            name="user-doc"
            id="user-doc"
            rows={25}
          ></textarea>
          <div className="flex flex-wrap items-center w-full my-6 justify-evenly">
            <label htmlFor="" className="mr-2 text-lg font-bold">
              No. of Sentences({userLines}):
              <input
                className="mx-4"
                type="range"
                min="4"
                max="40"
                onChange={(e) => setUserLines(parseInt(e.target.value))}
                value={userLines}
              />{" "}
            </label>
            <button
              disabled={!(userText.length > 0)}
              onClick={handleSummarise}
              className="px-4 py-2 font-bold text-white bg-red-500 focus:outline-none"
            >
              Get Summary
            </button>
            <button
              onClick={handleTranlate}
              className={`px-4 py-2 font-bold text-white bg-red-500 focus:outline-none ${
                hasSummed ? "block" : "hidden"
              }`}
            >
              Get Translation
            </button>
          </div>
          <div className="flex">
            <label htmlFor="lang-select" className="mx-12 text-xl font-bold">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              name="lang-select"
              className="px-6 py-2 mx-12 font-bold text-white bg-red-500 focus:outline-none"
              id="lang-select"
            >
              {Object.entries(languages).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start p-4 overflow-auto sm:w-full lg:w-1/2">
          <div className="w-full px-10 py-6 mb-4 overflow-auto bg-white border h-96">
            <ul className="list-disc">
              {summaryOrTranslated
                ? summarised
                    ?.replace(/\[...\]/gi, " ")
                    .split(". ")
                    .map((sentence, idx) => (
                      <li key={idx} className="mb-1">
                        {sentence}
                      </li>
                    ))
                : translated}
            </ul>
          </div>
          <div className="flex flex-row items-center justify-center">
            <button
              onClick={() => setSummaryOrTranslated(!summaryOrTranslated)}
              className={`px-4 py-2 my-4 font-bold text-white bg-red-500 focus:outline-none mb-4 ${
                hasSummed ? "block" : "hidden"
              }`}
            >
              {!summaryOrTranslated ? "View Summarised" : "View Translated"}
            </button>
            <button
              className={`px-4 py-2 m-4 font-bold text-white bg-red-500  focus:outline-none ${
                hasSummed ? "block" : "hidden"
              }`}
              onClick={() => {
                setHasSentiment(!hasSentiment);
              }}
            >
              {" "}
              {!hasSentiment ? "Show Sentiment" : "Hide Sentiment"}
            </button>
          </div>
        </div>
        <div
          className={`${
            hasSentiment ? "block" : "hidden"
          } pb-20 mt-4 w-full mx-auto`}
        >
          <h5 className="mb-2 text-2xl font-bold text-center">
            Sentiment Analysis
          </h5>
          <div className="flex flex-col items-center justify-center w-full">
            {Object.entries(sentiment).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-row justify-between w-full px-4 py-2 my-2 border border-gray-500 rounded-lg shadow-lg md:w-1/2"
              >
                <details className="px-4 py-1 text-lg italic text-red-500">
                  <summary className="focus:outline-none">{key}</summary>
                  <p className="py-2 text-sm text-black">{value[1]}</p>
                </details>
                <div className="px-4 py-1 text-lg font-bold uppercase ">
                  {key !== "score_tag" ? value[0] : scores[value[0]]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
