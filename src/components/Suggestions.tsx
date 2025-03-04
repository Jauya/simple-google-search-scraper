"use client";

import { useLoadingTimer } from "@/hooks/useLoadingTimer";
import { useSearchStore } from "@/store/searchStore";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { LoadingIndicator } from "./LoadingIndicator";
import { SuggestionItem } from "./SuggestionItem";

// Types
interface CopyStates {
  [key: number]: boolean;
}

// Main component
export default function Suggestions() {
  const { searchCollection, loading } = useSearchStore();
  const [copyStates, setCopyStates] = useState<CopyStates>({});
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const loadingTime = useLoadingTimer(loading);
  const [resultType, setResultType] = useState<
    "relatedSearches" | "peopleAlsoAsk"
  >("relatedSearches");

  const handleCopy = (
    suggestions: string[],
    index: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    const text = suggestions.join("\n");
    navigator.clipboard.writeText(text);

    setCopyStates((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setCopyStates((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex items-center p-2 pt-10 gap-2">
        <h2 className=" font-medium text-lg ">Resultado de </h2>
        <div className="flex">
          <button
            className={"px-4 py-1 text-sm  rounded-l-lg transition-colors duration-200 ".concat(
              resultType == "relatedSearches" ? "bg-zinc-900" : "bg-zinc-800"
            )}
            onClick={() =>
              resultType !== "relatedSearches" &&
              setResultType("relatedSearches")
            }
          >
            Google Suggest
          </button>
          <button
            className={"px-4 py-1 text-sm rounded-r-lg transition-colors duration-200 ".concat(
              resultType == "peopleAlsoAsk" ? "bg-zinc-900" : "bg-zinc-800"
            )}
            onClick={() =>
              resultType !== "peopleAlsoAsk" && setResultType("peopleAlsoAsk")
            }
          >
            People Also Ask
          </button>
        </div>
      </div>
      {loading && <LoadingIndicator loadingTime={loadingTime} />}
      <div className="p-2 flex flex-col gap-3">
        {searchCollection.map((search, index) => (
          <div key={index} className="bg-zinc-800/50 rounded-lg">
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between p-2 items-center cursor-pointer bg-zinc-800/60 rounded-lg"
            >
              <h3 className="font-medium text-white/80">
                {formatDate(search.date)}
                {index == 0 && " (Actual)"}
              </h3>
              <CopyButton
                isCopied={copyStates[index]}
                onClick={(e) =>
                  handleCopy(
                    resultType == "relatedSearches"
                      ? search.relatedSearches.map(
                          (relatedSearch) => relatedSearch
                        )
                      : search.peopleAlsoAsk.map(
                          (peopleAsk) => peopleAsk
                        ),
                    index,
                    e
                  )
                }
              />
            </div>
            {expandedIndex === index && (
              <>
                <div className="flex flex-col p-2">
                  {resultType == "relatedSearches"
                    ? search.relatedSearches.map((relatedSearch, i) => (
                        <SuggestionItem
                          key={relatedSearch + i}
                          suggestion={relatedSearch}
                          index={i}
                        />
                      ))
                    : search.peopleAlsoAsk.map((peopleAsk, i) => (
                        <SuggestionItem
                          key={peopleAsk + i}
                          suggestion={peopleAsk}
                          index={i}
                        />
                      ))}
                  {search.relatedSearches.length == 0 &&
                    resultType == "relatedSearches" && (
                      <div className="text-white/80">
                        No se encontraron sugerencias
                      </div>
                    )}
                  {search.peopleAlsoAsk.length == 0 &&
                    resultType == "peopleAlsoAsk" && (
                      <div className="text-white/80">
                        No se encontraron preguntas
                      </div>
                    )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
