import { create } from "zustand";

interface BlogState {
    search: string;
    tag: string | null;
    setSearch: (s: string) => void;
    setTag: (t: string | null) => void;
    dark: boolean;
    toggleDark: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
    search: "",
    tag: null,
    setSearch: (s) => set({ search: s }),
    setTag: (t) => set({ tag: t }),
    dark: false,
    toggleDark: () =>
        set((st) => {
            const next = !st.dark;
            if (typeof document !== "undefined") {
                document.documentElement.classList.toggle("dark", next);
            }
            return { dark: next };
        }),
}));
