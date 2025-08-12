import { useMemo, useState } from "react";
import { useBlogStore } from "@/stores/useBlogStore";
import { posts } from "@/data/posts";
import { X, Filter } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Filters() {
    const search = useBlogStore((s) => s.search);
    const tags = useBlogStore((s) => s.tags);
    const setSearch = useBlogStore((s) => s.setSearch);
    const addTag = useBlogStore((s) => s.addTag);
    const removeTag = useBlogStore((s) => s.removeTag);
    const clearTags = useBlogStore((s) => s.clearTags);
    const setCmdkOpen = useBlogStore((s) => s.setCmdkOpen);
    const [isOpen, setIsOpen] = useState(false);

    // Detect platform for shortcut label
    const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const shortcutLabel = isMac ? "⌘K" : "Ctrl + K";

    const allTags = useMemo(() => {
        const t = new Set<string>();
        posts.forEach((p) => p.tags.forEach((x) => t.add(x)));
        return Array.from(t).sort((a, b) => a.localeCompare(b));
    }, []);

    const handleTagToggle = (selectedTag: string) => {
        if (tags.includes(selectedTag)) {
            removeTag(selectedTag);
        } else {
            addTag(selectedTag);
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        removeTag(tagToRemove);
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
                <input
                    value={search}
                    readOnly
                    onClick={() => setCmdkOpen(true)}
                    onFocus={() => setCmdkOpen(true)}
                    placeholder="Search posts…"
                    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2 pr-16 text-base outline-none ring-stone-400 focus:ring-2 dark:border-stone-700 dark:bg-stone-900"
                    aria-label="Open command palette"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                    <kbd className="rounded-md border border-stone-200 bg-stone-50 px-2 py-1 text-sm font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
                        {shortcutLabel}
                    </kbd>
                </span>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-base hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
                    >
                        <Filter className="size-5" />
                        Filters
                        {tags.length > 0 && (
                            <span className="ml-1 rounded-full bg-stone-900 px-2 py-1 text-sm text-white dark:bg-stone-100 dark:text-stone-900">
                                {tags.length}
                            </span>
                        )}
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Filter Posts
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-4 text-lg font-medium text-stone-700 dark:text-stone-300">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={clearTags}
                                    className={`rounded-full border px-4 py-2 text-base font-medium transition-colors ${
                                        tags.length === 0
                                            ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                                            : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                                    }`}
                                >
                                    All
                                </button>
                                {allTags.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleTagToggle(t)}
                                        className={`rounded-full border px-4 py-2 text-base font-medium capitalize transition-colors ${
                                            tags.includes(t)
                                                ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                                                : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800"
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {tags.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-base font-medium text-stone-700 dark:text-stone-300">
                                    Active Filters ({tags.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <div
                                            key={tag}
                                            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-2 text-sm text-white dark:bg-stone-100 dark:text-stone-900"
                                        >
                                            <span className="capitalize">
                                                {tag}
                                            </span>
                                            <button
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 rounded-full p-1 hover:bg-white/20 transition-colors"
                                                aria-label={`Remove ${tag} filter`}
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearTags}
                                    className="h-10 px-3 text-base"
                                >
                                    <X className="size-4" />
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
