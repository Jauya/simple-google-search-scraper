"use client"
import { useKeywordsForm } from "@/hooks/useKeywordsForm";
import { useApikeyStore } from "@/store/apikeyStore";
import { useSearchStore } from "@/store/searchStore";
import { useRef, useState } from "react";

export default function KeywordsForm() {
    const { addSearch, setLoading, loading } = useSearchStore()
    const { apikey, setApikey } = useApikeyStore()
    const [error, setError] = useState<string | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { handleSubmit, verifyApikey } = useKeywordsForm({
        apikey,
        addSearch,
        setLoading,
        textareaRef,
        setError
    })

    return (
        <>
            <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                    <span className="font-semibold text-sm">Clave API</span>
                    <input className="bg-zinc-800/50 disabled:text-white/40 p-2 rounded-lg outline-none transition-colors duration-300" disabled={loading} value={apikey} onChange={(e) => setApikey(e.target.value)} />
                </label>
                <label className="flex flex-col gap-1">
                    <span className="font-semibold text-sm">Palabras clave</span>
                    <textarea className="bg-zinc-800/50 disabled:text-white/40 p-2 rounded-lg outline-none transition-colors duration-300" disabled={loading} ref={textareaRef} placeholder="Escribe aqui..." rows={8} />
                </label>
                <button className="bg-zinc-900 disabled:text-white/40 py-3 px-5 rounded-lg hover:bg-zinc-900/80 transition-colors duration-300" disabled={!verifyApikey || loading}>Enviar</button>
            </form>
            {error && !loading && (
                <p className="text-red-500 mt-2 text-sm px-2">{error}</p>
            )}
        </>
    )
}
