import { Moon, Sun } from "lucide-react";
import { useBlogStore } from "@/stores/useBlogStore";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
    const dark = useBlogStore((s) => s.dark);
    const toggle = useBlogStore((s) => s.toggleDark);
    return (
        <button
            aria-label="Toggle theme"
            onClick={toggle}
            className={cn(
                "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                "bg-white/60 backdrop-blur border-stone-200 hover:bg-white dark:bg-stone-900/60 dark:border-stone-800 dark:hover:bg-stone-900",
                className
            )}
        >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            <span className="hidden sm:block">{dark ? "Light" : "Dark"}</span>
        </button>
    );
}
