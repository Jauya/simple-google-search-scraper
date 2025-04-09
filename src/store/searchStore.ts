import { SearchCollection } from "@/types/searchCollection";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type States = {
  searchCollection: SearchCollection[];
  filterWords: string[];
  loading: boolean;
};

type Actions = {
  addFilterWords: (filterWords: string[]) => void;
  deleteFilterWord: (word: string) => void;
  clearFilterWords: () => void;

  addSearchCollection: (search: SearchCollection) => void;
  deleteSearchCollection: (uuid: string) => void;
  setLoading: (loading: boolean) => void;
};

type SuggestionStore = States & Actions;

export const useSearchStore = create<SuggestionStore>()(
  persist(
    (set, get) => ({
      filterWords: [],
      searchCollection: [],
      loading: false,

      addFilterWords: (filterWords: string[]) => {
        if (!get().filterWords.some((w) => filterWords.includes(w)))
          set({ filterWords: [...get().filterWords, ...filterWords] });
      },
      deleteFilterWord: (word: string) =>
        set({ filterWords: get().filterWords.filter((w) => w !== word) }),
      clearFilterWords: () => set({ filterWords: [] }),

      addSearchCollection: (search: SearchCollection) => {
        const searches = [...get().searchCollection, search]
          .sort((a, b) => b.date - a.date)
          .slice(0, 10);
        set({ searchCollection: searches });
      },
      deleteSearchCollection: (uuid: string) =>
        set({
          searchCollection: get().searchCollection.filter(
            (search) => search.uuid !== uuid
          ),
        }),
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: "suggestion-store",
      partialize: (state) => ({
        searchCollection: state.searchCollection,
        filterWords: state.filterWords,
      }),
    }
  )
);
