"use client";
import { useSearchStore } from "@/store/searchStore";
import { useState } from "react";

export default function FilteredKeywords() {
  const { filterWords, addFilterWords, deleteFilterWord, clearFilterWords } =
    useSearchStore();
  const [newWord, setNewWord] = useState("");

  const handleAddFilterWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim() !== "") {
      addFilterWords([newWord.trim()]);
      setNewWord("");
    }
  };
  const handleDeleteFilterWord = (word: string) => {
    deleteFilterWord(word);
  };
  const handleClearFilterWords = () => {
    clearFilterWords();
  };
  return (
    <div className="px-2 py-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-sm mb-2">
          Palabras filtradas ({filterWords.length})
        </h2>
        <div className="flex items-center gap-2">
          <form onSubmit={handleAddFilterWord} className="flex items-center">
            <input
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              type="text"
              className="bg-zinc-800/50 p-2 rounded-l-lg outline-none transition-colors duration-300 text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs  rounded-r-lg bg-zinc-800 transition-colors duration-300 hover:bg-zinc-700 font-medium"
            >
              Agregar
            </button>
          </form>
          <button
            onClick={handleClearFilterWords}
            className="px-4 py-2 text-xs  rounded-lg bg-zinc-800 transition-colors duration-300 hover:bg-zinc-700 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
      <div className="border border-zinc-700 rounded-lg">
        <div
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => {
            const accordion = document.getElementById("accordion-content");
            if (accordion) {
              accordion.classList.toggle("hidden");
            }
          }}
        >
          <span className="text-sm">Ver palabras filtradas</span>
          <svg
            className="w-4 h-4 transform transition-transform"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
        <div id="accordion-content" className="hidden">
          <div className="p-3 text-sm">
            {filterWords.length > 0 ? (
              <ul className="flex flex-wrap gap-1">
                {filterWords.map((word, index) => (
                  <li
                    key={index}
                    onClick={() => handleDeleteFilterWord(word)}
                    className="text-white/80 px-4 py-1 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors duration-300 cursor-pointer select-none"
                  >
                    {word}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay palabras filtradas</p>
            )}
          </div>
        </div>
      </div>
      <span className="text-xs text-gray-500">
        Algunas de las palabras más comunes que se filtran: &quot;pdf&quot;, &quot;gratis&quot;,
        &quot;gratuito&quot;, &quot;ejemplo&quot;, &quot;carrera&quot;, &quot;cursos&quot;, etc.
      </span>
    </div>
  );
}
