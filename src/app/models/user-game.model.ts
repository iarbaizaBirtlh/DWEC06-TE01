export interface UserGame {
    id?: string;
    gameId: number;
    name: string;
    background_image: string;
    status: 'playing' | 'completed' | 'wishlist';
    rating?: number;
    username?: string;
}