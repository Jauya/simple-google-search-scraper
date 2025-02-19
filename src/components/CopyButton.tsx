import { MouseEvent } from "react"

export const CopyButton = ({
    isCopied,
    onClick
}: {
    isCopied: boolean,
    onClick: (e: MouseEvent) => void
}) => (
    <button
        onClick={onClick}
        className="px-4 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-xs"
    >
        {isCopied ? 'Copiado!' : 'Copiar'}
    </button>
)
