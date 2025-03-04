export const filterKeywords = (keywords: string[]) => {
  const filterWords = [
    "pdf",
    "pdfs",
    "gratis",
    "gratuito",
    "gratuitos",
    "ejemplo",
    "ejemplos",
    "carreras",
    "carrera",
    "curso",
    "cursos",
  ]; // Palabras de filtro estáticas
  const uniqueKeywords = [...new Set(keywords)]; // Eliminar duplicados

  return uniqueKeywords
    .filter((keyword) => {
      const lowerKeyword = keyword.toLowerCase(); // Convertir a minúsculas
      return !filterWords.some((filterWord) =>
        lowerKeyword.includes(filterWord.toLowerCase())
      ); // Convertir a minúsculas y comparar
    })
    .sort(); // Ordenar alfabéticamente
};
