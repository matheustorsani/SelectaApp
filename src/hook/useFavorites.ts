import { useContext } from "react";
import { Product } from "../types/Products";
import { FavoritesContext } from "../context/FavoritesContext";

/**
 * Hook para acessar o contexto de Favoritos.
 * 
 * @returns {{
 *  favoriteProducts: Product[];
 *  toggleFavorite: (productId: number) => Promise<void>;
 *  isFavorite: (productId: number) => boolean;
 *  loadingFavorites: number[];
 *  reloadFavorites: () => Promise<void>;
 * }}
 * Retorna o contexto do usuário, incluindo informações e funções utilitárias.
 */
export function useFavorites(): {
    favoriteProducts: Product[];
    toggleFavorite: (productId: number) => Promise<void>;
    isFavorite: (productId: number) => boolean;
    loadingFavorites: number[];
    reloadFavorites: () => Promise<void>;
} {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error("useFavorites deve ser usado dentro de um <FavoritesProvider>");
    }

    return context;
}
