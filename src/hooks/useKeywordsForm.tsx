import { getSuggestions } from "@/actions/apifyActions";
import { Search } from "@/types";
import { FormEvent, RefObject } from "react";

interface UseKeywordsFormProps {
    apikey: string;
    addSearch: (search: Search) => void;
    setLoading: (loading: boolean) => void;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    setError?: (error: string) => void;
}

export function useKeywordsForm({ apikey, addSearch, setLoading, textareaRef, setError }: UseKeywordsFormProps) {
    const verifyApikey = apikey.length > 0;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const keywords = textareaRef.current?.value;
        if (keywords?.trim()) {
            const response = await getSuggestions(keywords, apikey);

            if ('error' in response) {
                setError?.(response.error);
                setLoading(false);
                return;
            }

            // Clear any previous error when request is successful
            setError?.("");

            const suggestions = response.map((item) =>
                item.relatedQueries.map((related) => related.title)
            ).flat();

            const search: Search = {
                keywords,
                suggestions,
                date: Date.now(),
            }
            addSearch(search)
        }
        setLoading(false);
    }

    return {
        verifyApikey,
        handleSubmit
    }
}