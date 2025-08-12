import { useState, useEffect } from "react";
import type { Post } from "@/types";
import {
    CalendarDays,
    Tag,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

export default function PostCard({ post }: { post: Post }) {
    const [open, setOpen] = useState(false);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();
    const [expandedPhoto, setExpandedPhoto] = useState<string | null>(null);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrentPhotoIndex(api.selectedScrollSnap());
        });
    }, [api]);

    const handlePhotoChange = (index: number) => {
        setCurrentPhotoIndex(index);
        api?.scrollTo(index);
    };

    const currentPhoto = post.photos[currentPhotoIndex];

    return (
        <Card className="group overflow-hidden transition hover:shadow-md">
            <button
                onClick={() => setOpen(true)}
                className="block w-full text-left"
            >
                <img
                    src={post.cover}
                    alt="Cover"
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                />
                <CardContent className="space-y-2 p-4">
                    <h3 className="text-base font-semibold tracking-tight">
                        {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-stone-600 dark:text-stone-300">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-xs text-stone-500 dark:text-stone-400">
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="size-3" />
                            {fmtDate(post.date)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <Tag className="size-3" />
                            {post.tags.join(", ")}
                        </span>
                    </div>
                </CardContent>
            </button>

            {/* Modal with carousel for multiple photos */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            {post.title}
                        </DialogTitle>
                        <p className="text-sm text-stone-500">
                            {fmtDate(post.date)} • {post.tags.join(" • ")}
                        </p>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Photo carousel if multiple photos, single image if only one */}
                        {post.photos.length > 1 ? (
                            <div className="relative">
                                <Carousel
                                    className="w-full"
                                    setApi={setApi}
                                    opts={{
                                        loop: true,
                                        align: "start",
                                    }}
                                >
                                    <CarouselContent>
                                        {post.photos.map((photo, index) => (
                                            <CarouselItem key={index}>
                                                <div className="flex aspect-video items-center justify-center relative">
                                                    <img
                                                        src={photo.url}
                                                        alt={`${
                                                            post.title
                                                        } - Photo ${index + 1}`}
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />

                                                    {/* Expand icon for vertical photos */}
                                                    {photo.orientation ===
                                                        "vertical" && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setExpandedPhoto(
                                                                    photo.url
                                                                );
                                                            }}
                                                            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg group"
                                                        >
                                                            <div className="bg-white/90 dark:bg-stone-900/90 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200">
                                                                <Maximize2 className="h-6 w-6 text-stone-700 dark:text-stone-300" />
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>

                                    {/* Enhanced navigation arrows */}
                                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-stone-900/80 dark:hover:bg-stone-900">
                                        <ChevronLeft className="h-4 w-4" />
                                    </CarouselPrevious>
                                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-stone-900/80 dark:hover:bg-stone-900">
                                        <ChevronRight className="h-4 w-4" />
                                    </CarouselNext>
                                </Carousel>

                                {/* Photo indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-sm">
                                        {post.photos.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    handlePhotoChange(index)
                                                }
                                                className={cn(
                                                    "h-2 w-2 rounded-full transition-all",
                                                    index === currentPhotoIndex
                                                        ? "bg-white"
                                                        : "bg-white/50 hover:bg-white/75"
                                                )}
                                                aria-label={`Go to photo ${
                                                    index + 1
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Photo counter */}
                                <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                                    {currentPhotoIndex + 1} /{" "}
                                    {post.photos.length}
                                </div>
                            </div>
                        ) : (
                            <img
                                src={post.cover}
                                alt="Cover"
                                className="w-full rounded-lg"
                            />
                        )}

                        {/* Post content */}
                        <div className="space-y-3">
                            {post.body.map((para, i) => (
                                <p
                                    key={i}
                                    className="text-base leading-7 text-stone-700 dark:text-stone-200"
                                >
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Close button */}
                        <div className="flex justify-end pt-2">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Expanded photo popup */}
            <Dialog
                open={!!expandedPhoto}
                onOpenChange={() => setExpandedPhoto(null)}
            >
                <DialogContent className="max-w-none max-h-none w-auto h-auto p-0 border-0 shadow-none bg-transparent">
                    <div className="relative">
                        {expandedPhoto && (
                            <img
                                src={expandedPhoto}
                                alt="Expanded photo"
                                className="max-w-[95vw] max-h-[95vh] object-contain"
                            />
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setExpandedPhoto(null)}
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white dark:bg-stone-900/90 dark:hover:bg-stone-900 border-0 shadow-lg"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

function fmtDate(s: string) {
    const d = new Date(s + "T00:00:00");
    return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
