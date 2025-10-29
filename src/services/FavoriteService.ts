import { User } from "../types/User";

/**
 * Alterna o estado de um produto nos favoritos do usuário.
 * 
 * @param user Usuário atual
 * @param productId ID do produto a ser adicionado ou removido
 * @returns Novo objeto User com lista de favoritos atualizada
 */
export function toggleFavorite(user: User, productId: number): User {
  if (typeof productId !== "number" || Number.isNaN(productId)) {
    throw new Error("ID do produto inválido");
  }

  const favorites = user.favorites ?? [];
  const updatedFavorites = favorites.includes(productId)
    ? favorites.filter(id => id !== productId)
    : [...favorites, productId];

  if (updatedFavorites === favorites) return user;

  return { ...user, favorites: updatedFavorites };
}
