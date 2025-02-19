import { create } from "zustand"
import { persist } from "zustand/middleware"

type States = {
    apikey: string
}

type Actions = {
    setApikey: (apikey: string) => void
}

type ApikeyStore = States & Actions

export const useApikeyStore = create<ApikeyStore>()(
    persist(
        (set) => ({
            apikey: "",
            setApikey: (apikey: string) =>
                set({ apikey })

        }),
        {
            name: "apikey-store",
        }
    )
)