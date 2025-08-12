import { useMemo } from "react";
import { posts as ALL } from "@/data/posts";
import { useBlogStore } from "@/stores/useBlogStore";
import ThemeToggle from "@/components/ThemeToggle";
import PostCard from "@/components/PostCard";
import Filters from "@/components/Filters";
import CommandPalette from "@/components/CommandPalette";

export default function App() {
    const search = useBlogStore((s) => s.search);
    const tags = useBlogStore((s) => s.tags);

    const posts = useMemo(() => {
        const q = search.trim().toLowerCase();
        return ALL.filter((p) => {
            const matchesQ =
                q === "" ||
                [p.title, p.excerpt, ...p.body]
                    .join(" ")
                    .toLowerCase()
                    .includes(q);
            const matchesTags =
                tags.length === 0 || tags.some((tag) => p.tags.includes(tag));
            return matchesQ && matchesTags;
        }).sort((a, b) => b.date.localeCompare(a.date));
    }, [search, tags]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            {/* Command Palette - Available globally */}
            <CommandPalette />

            {/* Header */}
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Summer 2025 Internship at BTG Pactual
                    </h1>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        Come learn about my internship at BTG Pactual and my
                        life at São Paulo, Brazil!!
                    </p>
                </div>
                <ThemeToggle />
            </header>

            {/* Filters */}
            <section className="mb-6">
                <Filters />
            </section>

            {/* Count */}
            <p className="mb-3 text-xs text-stone-500">
                {posts.length} post{posts.length === 1 ? "" : "s"}
            </p>

            {/* Grid that auto-adjusts to any number of posts */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                    <PostCard key={p.id} post={p} />
                ))}
            </section>
        </div>
    );
}
