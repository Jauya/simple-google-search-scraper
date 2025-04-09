"use client";

import { useLoadingTimer } from "@/hooks/useLoadingTimer";
import { useSearchStore } from "@/store/searchStore";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { LoadingIndicator } from "./LoadingIndicator";
import { SuggestionItem } from "./SuggestionItem";
import { filterKeywords } from "@/utils/filterKeywords";

// Types
interface CopyStates {
  [key: number]: boolean;
}

// Main component
export default function Suggestions() {
  const {
    searchCollection,
    loading,
    deleteSearchCollection,
    addFilterWords,
    filterWords,
    deleteFilterWord,
  } = useSearchStore();
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
    const text = filterKeywords(suggestions, filterWords).join("\n");
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
      <div className="flex items-center p-2 gap-2">
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
          <div
            key={index}
            className="bg-zinc-800/50 rounded-lg overflow-hidden border border-zinc-700/50"
          >
            <div
              onClick={() => toggleAccordion(index)}
              className="flex justify-between py-2 px-3 items-center cursor-pointer bg-zinc-950/50 rounded-lg rounded-b-none"
            >
              <h3 className="font-medium text-white/70">
                {formatDate(search.date)}
                {index == 0 && " (Actual)"}
              </h3>
              <div className="flex items-center gap-2">
                <CopyButton
                  isCopied={copyStates[index]}
                  onClick={(e) =>
                    handleCopy(
                      resultType == "relatedSearches"
                        ? search.relatedSearches.map(
                            (relatedSearch) => relatedSearch
                          )
                        : search.peopleAlsoAsk.map((peopleAsk) => peopleAsk),
                      index,
                      e
                    )
                  }
                />
                <button
                  onClick={() => deleteSearchCollection(search.uuid)}
                  className="cursor-pointer select-none p-2 rounded-lg transition-colors duration-300 font-medium text-white/70 hover:text-white/60 border border-zinc-700/50"
                >
                  <svg
                    className="w-4 h-4 "
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <>
                <div className="flex flex-col">
                  {resultType == "relatedSearches"
                    ? search.relatedSearches.map((relatedSearch, i) => (
                        <div
                          key={relatedSearch + i}
                          onClick={() => {
                            if (
                              filterWords.some(
                                (value) => value === relatedSearch
                              )
                            ) {
                              deleteFilterWord(relatedSearch);
                            } else {
                              addFilterWords([relatedSearch]);
                            }
                          }}
                          className="group flex items-center gap-2 border-b border-zinc-700/50 p-2 last:border-b-0"
                        >
                          <SuggestionItem
                            suggestion={relatedSearch}
                            index={i}
                          />
                        </div>
                      ))
                    : search.peopleAlsoAsk.map((peopleAsk, i) => (
                        <div
                          key={peopleAsk + i}
                          onClick={() => {
                            if (
                              filterWords.some((value) => value === peopleAsk)
                            ) {
                              deleteFilterWord(peopleAsk);
                            } else {
                              addFilterWords([peopleAsk]);
                            }
                          }}
                          className="group flex items-center gap-2 border-b border-zinc-700/50 p-2 last:border-b-0"
                        >
                          <SuggestionItem suggestion={peopleAsk} index={i} />
                        </div>
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
