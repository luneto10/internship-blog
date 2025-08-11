export type PhotoOrientation = "horizontal" | "vertical";

export type Photo = {
    url: string;
    orientation: PhotoOrientation;
};

// Helper function to create photos with default horizontal orientation
export function createPhoto(
    url: string,
    orientation?: PhotoOrientation
): Photo {
    return {
        url,
        orientation: orientation || "horizontal",
    };
}

/**
 * Vercel/Vite friendly:
 * - Vite não faz glob em /public. Por isso varremos /src/photos/** no build.
 * - Em runtime, filtramos pela pasta (folderName) e ordenamos naturalmente.
 * - O `as:"url"` já retorna a URL final (hash/resolvida), pronta para <img/>.
 */
const allPhotos = import.meta.glob(
    "/src/photos/**/*.{png,jpg,jpeg,JPG,webp,avif,heic,HEIC}",
    { eager: true, as: "url" }
) as Record<string, string>;

function getPhotoFiles(folderName: string): string[] {
    // normaliza: remove barras extras
    const normalized = folderName.replace(/^\/+|\/+$/g, "");
    const prefix = `/src/photos/${normalized}/`;

    return Object.entries(allPhotos)
        .filter(([path]) => path.startsWith(prefix))
        .map(([, url]) => url)
        .sort((a, b) =>
            a.localeCompare(b, undefined, {
                numeric: true,
                sensitivity: "base",
            })
        );
}

// Public function to create photos from folder - all marked as vertical
export function createPhotosFromFolder(folderName: string): Photo[] {
    const photoFiles = getPhotoFiles(folderName);
    return photoFiles.map((filePath) => createPhoto(filePath, "vertical"));
}

export type Post = {
    id: string;
    title: string;
    date: string; // YYYY-MM-DD
    tags: string[];
    cover: string; // pode continuar usando "/photos/whatever.jpg" se estiver em /public
    photos: Photo[]; // array of photos with orientation info
    excerpt: string;
    body: string[]; // array of paragraphs
};
