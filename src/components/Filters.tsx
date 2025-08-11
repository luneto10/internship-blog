import { useMemo } from "react";
import { useBlogStore } from "@/stores/useBlogStore";
import { posts } from "@/data/posts";
import { X } from "lucide-react";

export default function Filters() {
    const search = useBlogStore((s) => s.search);
    const tag = useBlogStore((s) => s.tag);
    const setSearch = useBlogStore((s) => s.setSearch);
    const setTag = useBlogStore((s) => s.setTag);

    const allTags = useMemo(() => {
        const t = new Set<string>();
        posts.forEach((p) => p.tags.forEach((x) => t.add(x)));
        return Array.from(t).sort((a, b) => a.localeCompare(b));
    }, []);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts…"
                className="w-full sm:max-w-xs rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none ring-stone-400 focus:ring-2 dark:border-stone-700 dark:bg-stone-900"
            />
            <div className="flex flex-wrap items-center gap-2">
                <button
                    onClick={() => setTag(null)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                        tag === null
                            ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                            : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700"
                    }`}
                >
                    All
                </button>
                {allTags.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTag(t === tag ? null : t)}
                        className={`rounded-full border px-3 py-1 text-xs capitalize ${
                            t === tag
                                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                                : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700"
                        }`}
                    >
                        {t}
                    </button>
                ))}
                {tag && (
                    <button
                        onClick={() => setTag(null)}
                        className="inline-flex items-center gap-1 rounded-full border border-stone-300 px-2 py-1 text-xs bg-white dark:bg-stone-900 dark:border-stone-700"
                    >
                        <X className="size-3" /> Clear
                    </button>
                )}
            </div>
        </div>
    );
}
