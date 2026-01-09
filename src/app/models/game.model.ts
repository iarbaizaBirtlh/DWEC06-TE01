export interface Game {
    id: number;
    name: string;
    released: string;
    rating: number;
    background_image: string;
    description?: string;
    genres: {name: string}[];
    platforms: {platform: {name: string}}[];
}