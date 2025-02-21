export const SuggestionItem = ({
  suggestion,
  index,
}: {
  suggestion: string;
  index: number;
}) => <span key={suggestion + index}>{suggestion}</span>;
