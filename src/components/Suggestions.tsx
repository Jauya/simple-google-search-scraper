"use client"

import { useLoadingTimer } from "@/hooks/useLoadingTimer"
import { useSearchStore } from "@/store/searchStore"
import { formatDate } from "@/utils/formatDate"
import { useState } from "react"
import { CopyButton } from "./CopyButton"
import { LoadingIndicator } from "./LoadingIndicator"

// Types
interface CopyStates {
    [key: number]: boolean
}

const SuggestionItem = ({ suggestion, index }: { suggestion: string, index: number }) => (
    <span key={suggestion + index}>{suggestion}</span>
)


// Main component
export default function Suggestions() {
    const { searches, loading } = useSearchStore()
    const [copyStates, setCopyStates] = useState<CopyStates>({})
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const loadingTime = useLoadingTimer(loading)

    const handleCopy = (suggestions: string[], index: number, e: React.MouseEvent) => {
        e.stopPropagation()
        const text = suggestions.join('\n')
        navigator.clipboard.writeText(text)

        setCopyStates(prev => ({ ...prev, [index]: true }))
        setTimeout(() => {
            setCopyStates(prev => ({ ...prev, [index]: false }))
        }, 2000)
    }

    const toggleAccordion = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <>
            <h2 className="p-2 font-medium text-lg pt-10">Resultado de Google Suggest</h2>
            {loading && <LoadingIndicator loadingTime={loadingTime} />}
            <div className="p-2 flex flex-col gap-3">
                {searches.map((search, index) => (
                    <div key={index} className="bg-zinc-800/50 rounded-lg">
                        <div
                            onClick={() => toggleAccordion(index)}
                            className="flex justify-between p-2 items-center cursor-pointer bg-zinc-800/60 rounded-lg"
                        >
                            <h3 className="font-medium text-white/80">
                                {formatDate(search.date)}{index == 0 && " (Actual)"}
                            </h3>
                            <CopyButton
                                isCopied={copyStates[index]}
                                onClick={(e) => handleCopy(search.suggestions, index, e)}
                            />
                        </div>
                        {expandedIndex === index && (
                            <div className="flex flex-col p-2">
                                {search.suggestions.map((suggestion, i) => (
                                    <SuggestionItem
                                        key={suggestion + i}
                                        suggestion={suggestion}
                                        index={i}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
