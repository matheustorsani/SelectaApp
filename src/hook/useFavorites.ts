import { useContext } from "react";
import { Product } from "../types/Products";
import { FavoritesContext } from "../context/FavoritesContext";

/**
 * Hook para acessar e manipular os produtos favoritos do usuário.
 *
 * Use este hook dentro de um <FavoritesProvider> (fornecido por FavoritesContext)
 * para obter a lista de favoritos e ações relacionadas.
 *
 * Observação importante: para saber exatamente o que este hook retorna
 * (tipos e formato das propriedades/funcões), consulte a definição de
 * FavoritesContext, pois o retorno é delegada diretamente ao contexto.
 *
 * Comportamento:
 * - Retorna a lista de produtos favoritados.
 * - Fornece função para alternar (adicionar/remover) um favorito.
 * - Permite verificar se um produto é favorito.
 * - Expõe um array com IDs que estão em processo de carregamento/alteração.
 * - Permite recarregar os favoritos explicitamente.
 *
 * @throws {Error} Lança um erro se o hook for usado fora de um <FavoritesProvider>.
 *
 * @returns {{
 *   favoriteProducts: Product[];
 *   toggleFavorite: (productId: number) => Promise<void>;
 *   isFavorite: (productId: number) => boolean;
 *   loadingFavorites: number[];
 *   reloadFavorites: () => Promise<void>;
 * }} Objeto com a lista de favoritos e funções para manipulação.
 *
 * @example
 * // Uso básico:
 * // const { favoriteProducts, toggleFavorite, isFavorite } = useFavorites();
 *
 * @see {@link FavoritesContext} Para a definição completa dos tipos e comportamento retornado.
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
