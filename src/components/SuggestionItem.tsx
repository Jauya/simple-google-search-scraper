import { useSearchStore } from "@/store/searchStore";

export const SuggestionItem = ({
  suggestion,
  index,
}: {
  suggestion: string;
  index: number;
}) => { 
  const {filterWords} = useSearchStore();
  return <span key={suggestion + index} className={filterWords.some((value)=> value === suggestion) ? 'text-zinc-500' : ''}>{suggestion}</span>
};
