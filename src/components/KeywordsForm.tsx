"use client";
import { useKeywordsForm } from "@/hooks/useKeywordsForm";
import { useApikeyStore } from "@/store/apikeyStore";
import { useSearchStore } from "@/store/searchStore";
import { separateKeywords } from "@/utils/separateKeywords";
import { useRef, useState } from "react";

export default function KeywordsForm() {
  const { addSearchCollection, setLoading, loading } = useSearchStore();
  const { apikey, setApikey } = useApikeyStore();
  const [error, setError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [keywordsLength, setKeywordsLength] = useState(0);

  const { handleSubmit, verifyApikey } = useKeywordsForm({
    apikey,
    addSearchCollection: addSearchCollection,
    setLoading,
    textareaRef,
    setError,
  });
  const handleTextareaChange = () => {
    const value = textareaRef.current?.value ?? "";
    const separated = separateKeywords(value);
    setKeywordsLength(separated.length);
  };
  return (
    <>
      <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-sm">Clave API</span>
          <input
            className="bg-zinc-800/50 disabled:text-white/40 p-2 rounded-lg outline-none transition-colors duration-300"
            disabled={loading}
            value={apikey}
            onChange={(e) => setApikey(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-semibold text-sm">
            Palabras clave ({keywordsLength}/150)
          </span>
          <textarea
            className="bg-zinc-800/50 disabled:text-white/40 p-2 rounded-lg outline-none transition-colors duration-300"
            disabled={loading}
            ref={textareaRef}
            placeholder="Escribe aqui..."
            rows={8}
            onChange={handleTextareaChange}
          />
        </label>
        <button
          className="bg-zinc-900 disabled:text-white/40 py-3 px-5 rounded-lg hover:bg-zinc-900/80 transition-colors duration-300"
          disabled={!verifyApikey || loading}
        >
          Enviar
        </button>
      </form>
      {error && !loading && (
        <p className="text-red-500 mt-2 text-sm px-2">{error}</p>
      )}
    </>
  );
}
