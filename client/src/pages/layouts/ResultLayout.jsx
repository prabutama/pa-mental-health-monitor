import React from "react";
import ResultCard from "./ResultCard";
import logo from "@/assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function ResultLayout() {
  const results = [
    {
      title: "Hasil",
      content: "Ya, anda dinyatakan sedikit stres bulan ini",
    },
    {
      title: "Saran",
      content: "Silahkan pergi ke kedai Gacoan terdekat",
    },
  ];
  return (
    <div>
      <main className=" pl-20 p-10 bg-white max-md:pl-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <img src={logo} className="w-10 md:w-16 h-16" />
          <h1 className="text-sm md:text-3xl font-semibold mt-5">MindTrack</h1>
          <section className="flex flex-col w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-3xl font-extrabold text-black max-md:mt-10 max-md:max-w-full">
              {results.map((result, index) => (
                <ResultCard
                  key={index}
                  title={result.title}
                  content={result.content}
                />
              ))}
              <blockquote className="mt-16 mr-8 ml-2.5 text-2xl font-semibold max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                "Anda berharga, dan menjaga kesehatan mental adalah cara terbaik
                untuk menghargai dan mencintai diri sendiri."
              </blockquote>
            </div>
          </section>
          <aside className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/85f73562a95c4199a5dedcbab3c8d0b87c7c5af27468fbc836b50deec4db73c3?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
              alt="Character illustration"
              className="object-contain z-10 shrink-0 mr-0 max-w-full aspect-[0.72] mt-[552px] w-[268px] max-md:mt-10"
            />
          </aside>
            <Link to = "/">
            <button
              className="h-12 w-12 mt-3 border-2 border-green-500 text-green-500 rounded-full hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
            >
              ←
            </button>
            </Link>
        </div>
      </main>
    </div>
  );
}
