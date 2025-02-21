import { searchSerperAction } from "@/actions/serperActions";
import { SearchCollection } from "@/types/searchCollection";
import { PeopleAlsoAsk, RelatedSearch } from "@/types/searchData";
import { delay } from "@/utils/delay";
import { separateKeywords } from "@/utils/separateKeywords";
import { FormEvent, RefObject } from "react";

interface UseKeywordsFormProps {
  apikey: string;
  addSearchCollection: (searchCollection: SearchCollection) => void;
  setLoading: (loading: boolean) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  setError: (error: string | null) => void;
}

export function useKeywordsForm({
  apikey,
  addSearchCollection,
  setLoading,
  textareaRef,
  setError,
}: UseKeywordsFormProps) {
  const verifyApikey = apikey.length > 0;

  const start = () => {
    setLoading(true);
    setError(null);
  };

  const stopWithError = (error: string) => {
    setError(error);
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    start();
    const keywords = separateKeywords(textareaRef.current?.value ?? "");

    if (keywords.length === 0) {
      stopWithError("Debes ingresar al menos una palabra clave");
      return;
    }
    if (keywords.length > 99) {
      stopWithError("Solo puedes ingresar 99 palabras clave");
      return;
    }
    if (!verifyApikey) {
      stopWithError("Debes ingresar una API key");
      return;
    }

    const peopleAlsoAsk: PeopleAlsoAsk[] = [];
    const relatedSearches: RelatedSearch[] = [];

    for (const keyword of keywords) {
      await delay(2000);
      const resData = await searchSerperAction(keyword, apikey);
      if (resData instanceof Error) {
        stopWithError(resData.message);
        break;
      }
      if (resData.peopleAlsoAsk) {
        peopleAlsoAsk.push(...resData.peopleAlsoAsk);
      }
      if (resData.relatedSearches) {
        relatedSearches.push(...resData.relatedSearches);
      }
    }

    if (peopleAlsoAsk.length === 0 && relatedSearches.length === 0) {
      stopWithError("No se encontraron resultados");
    } else {
      const newSearchCollection: SearchCollection = {
        uuid: crypto.randomUUID(),
        peopleAlsoAsk,
        relatedSearches,
        date: Date.now(),
      };
      setLoading(false);
      addSearchCollection(newSearchCollection);
    }
  };

  return {
    verifyApikey,
    handleSubmit,
  };
}
