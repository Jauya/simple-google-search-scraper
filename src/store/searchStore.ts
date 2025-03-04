import { SearchCollection } from "@/types/searchCollection";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type States = {
  searchCollection: SearchCollection[];
  loading: boolean;
};

type Actions = {
  addSearchCollection: (search: SearchCollection) => void;
  setLoading: (loading: boolean) => void;
};
type SuggestionStore = States & Actions;

export const useSearchStore = create<SuggestionStore>()(
  persist(
    (set, get) => ({
      searchCollection: [],
      loading: false,
      addSearchCollection: (search: SearchCollection) => {
        const searches = [...get().searchCollection, search]
          .sort((a, b) => b.date - a.date)
          .slice(0, 10);
        set({ searchCollection: searches });
      },
      setLoading: (loading: boolean) => set({ loading }),
    }),
    {
      name: "suggestion-store",
      partialize: (state) => ({ searchCollection: state.searchCollection }),
    }
  )
);
