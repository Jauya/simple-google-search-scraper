import { Search } from "@/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type States = {
    searches: Search[]
    loading: boolean
}

type Actions = {
    addSearch: (search: Search) => void
    setLoading: (loading: boolean) => void
}
type SuggestionStore = States & Actions

export const useSearchStore = create<SuggestionStore>()(
    persist(
        (set, get) => ({
            searches: [],
            loading: false,
            addSearch: (search: Search) => {
                const searches = [...get().searches, search]
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 10)
                set({ searches })
            },
            setLoading: (loading: boolean) => set({ loading })
        }),
        {
            name: "suggestion-store",
            partialize: (state) => ({ searches: state.searches })
        }
    )
)