import { User } from "../types/User";

export function toggleFavorite(user: User, productId: number): User {
    const favorites = user.favorites ?? [];
    const updatedFavorites = favorites.includes(productId)
        ? favorites.filter(id => id !== productId)
        : [...favorites, productId];
    return { ...user, favorites: updatedFavorites };
}