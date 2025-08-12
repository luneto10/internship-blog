import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { useBlogStore } from "@/stores/useBlogStore";
import { posts } from "@/data/posts";
import { Search, Tag, FileText } from "lucide-react";

export default function CommandPalette() {
    const open = useBlogStore((s) => s.cmdkOpen);
    const setOpen = useBlogStore((s) => s.setCmdkOpen);

    const [query, setQuery] = useState("");
    const globalSearch = useBlogStore((s) => s.search);
    const setGlobalSearch = useBlogStore((s) => s.setSearch);
    const addTag = useBlogStore((s) => s.addTag);
    const clearTags = useBlogStore((s) => s.clearTags);

    // Platform shortcut label
    const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const shortcutLabel = isMac ? "⌘K" : "Ctrl + K";

    // When opening, seed the input with the current global search
    useEffect(() => {
        if (open) {
            setQuery(globalSearch);
        }
    }, [open, globalSearch]);

    // Open/close with ⌘K / Ctrl+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return posts;
        return posts.filter((p) =>
            [p.title, p.excerpt, ...p.body, ...p.tags]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [query]);

    const selectPost = (id: string) => {
        const post = posts.find((p) => p.id === id);
        if (!post) return;
        setGlobalSearch(post.title);
        setOpen(false);
        setQuery("");
    };

    const selectTag = (t: string) => {
        clearTags();
        addTag(t);
        setOpen(false);
        setQuery("");
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Search and Command"
            className="fixed left-1/2 top-1/2 z-[60] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl dark:border-stone-700 dark:bg-stone-900"
        >
            <div className="flex items-center border-b border-stone-200 px-4 py-3 dark:border-stone-700">
                <Search className="mr-2 size-4 text-stone-500" />
                <Command.Input
                    autoFocus
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search posts, tags…"
                    className="flex-1 bg-transparent text-base outline-none placeholder:text-stone-500"
                />
                <kbd className="ml-2 rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-sm font-medium text-stone-000 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    {shortcutLabel}
                </kbd>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-stone-500">
                    No results found
                </Command.Empty>

                <Command.Group heading="Quick Actions" className="px-2">
                    <Command.Item
                        onSelect={() => {
                            setGlobalSearch(query);
                            setOpen(false);
                            setQuery("");
                        }}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800"
                    >
                        <Search className="size-4 text-stone-500" />
                        <span>Search for “{query || "…"}”</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="Posts" className="mt-2 px-2">
                    {results.map((p) => (
                        <Command.Item
                            key={p.id}
                            value={`post:${p.id}`}
                            onSelect={() => selectPost(p.id)}
                            className="flex items-start gap-3 rounded-lg px-2 py-2 aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800"
                        >
                            <FileText className="mt-1 size-4 text-stone-500" />
                            <div className="flex-1">
                                <div className="font-medium">{p.title}</div>
                                <div className="text-sm text-stone-500 line-clamp-2">
                                    {p.excerpt}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {p.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2 py-1 text-[11px] capitalize text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                                        >
                                            <Tag className="size-3" />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Group heading="Tags" className="mt-2 px-2">
                    {Array.from(new Set(posts.flatMap((p) => p.tags))).map(
                        (t) => (
                            <Command.Item
                                key={t}
                                value={`tag:${t}`}
                                onSelect={() => selectTag(t)}
                                className="flex items-center gap-3 rounded-lg px-2 py-2 aria-selected:bg-stone-100 dark:aria-selected:bg-stone-800"
                            >
                                <Tag className="size-4 text-stone-500" />
                                <span className="capitalize">{t}</span>
                            </Command.Item>
                        )
                    )}
                </Command.Group>
            </Command.List>
        </Command.Dialog>
    );
}
