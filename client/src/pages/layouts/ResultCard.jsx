import React from "react";

function ResultCard({ title, content }) {
  return (
    <>
      <h2 className="self-center text-zinc-800 pt-10">{title}</h2>
      <div className="px-12 pt-12 pb-28 mt-9 text-lg bg-white rounded-lg border-emerald-800 border-solid border-[3px] max-md:px-5 max-md:pb-28 max-md:max-w-full">
        {Array.isArray(content) ? (
          <ul className="list-disc pl-5">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          content
        )}
      </div>
    </>
  );
}

export default ResultCard;