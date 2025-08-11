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

function getPhotoFiles(folderName: string): string[] {
    // Carrega todos os arquivos de todas as pastas dentro de /public/photos
    const modules = import.meta.glob(
        "/public/photos/**/*.{png,jpg,jpeg,JPG,webp,heic,HEIC}",
        { eager: true, as: "url" }
    ) as Record<string, string>;

    // Filtra apenas os que pertencem à pasta solicitada
    const urls = Object.values(modules).filter((url) =>
        url.includes(`/photos/${folderName}/`)
    );

    return urls;
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
    cover: string; // "/photos/whatever.jpg" from /public - main display image
    photos: Photo[]; // array of photos with orientation info
    excerpt: string;
    body: string[]; // array of paragraphs
};
