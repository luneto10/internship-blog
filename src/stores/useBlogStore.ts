import { create } from "zustand";

interface BlogState {
    search: string;
    tags: string[];
    setSearch: (s: string) => void;
    setTags: (t: string[]) => void;
    addTag: (t: string) => void;
    removeTag: (t: string) => void;
    clearTags: () => void;
    dark: boolean;
    toggleDark: () => void;
    cmdkOpen: boolean;
    setCmdkOpen: (open: boolean) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
    search: "",
    tags: [],
    setSearch: (s) => set({ search: s }),
    setTags: (t) => set({ tags: t }),
    addTag: (t) =>
        set((state) => ({
            tags: state.tags.includes(t) ? state.tags : [...state.tags, t],
        })),
    removeTag: (t) =>
        set((state) => ({
            tags: state.tags.filter((tag) => tag !== t),
        })),
    clearTags: () => set({ tags: [] }),
    dark: false,
    toggleDark: () =>
        set((st) => {
            const next = !st.dark;
            if (typeof document !== "undefined") {
                document.documentElement.classList.toggle("dark", next);
            }
            return { dark: next };
        }),
    cmdkOpen: false,
    setCmdkOpen: (open) => set({ cmdkOpen: open }),
}));
