import { MouseEvent } from "react";

export const CopyButton = ({
  isCopied,
  onClick,
}: {
  isCopied: boolean;
  onClick: (e: MouseEvent) => void;
}) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-xs transition-colors duration-300 select-none"
  >
    {isCopied ? "Copiado!" : "Copiar"}
  </button>
);
