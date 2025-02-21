export const separateKeywords = (keywords: string) => {
  if (!keywords.trim()) return [];

  const keywordsArray = keywords
    .split("\n")
    .map((keyword) => (keyword.trim() ? keyword.trim() : null))
    .filter((keyword) => keyword !== null);
  return keywordsArray;
};
