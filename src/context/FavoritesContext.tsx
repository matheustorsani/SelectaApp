import React, { createContext, useState } from "react";
import { Product } from "../types/Products";
import { favorites } from "../services/api/favorites/favorites";
import { removeFavorite } from "../services/api/favorites/removeFavorites";
import { addFavorites } from "../services/api/favorites/addFavorites";

export const FavoritesContext = createContext<{
  favoriteProducts: Product[];
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  loadingFavorites: number[];
  reloadFavorites: () => Promise<void>;
} | null>(null);

/**
 * Provider de contexto que gerencia os produtos favoritos do usuário.
 *
 * Fornece um estado centralizado com a lista de favoritos e operações relacionadas,
 * permitindo componentes consumidores lerem a lista, alternarem o estado de favorito
 * de um produto e consultarem se um produto é favorito no momento.
 *
 * @remarks
 * - Depende do hook `useUser()` para obter o usuário atual; não realiza operações enquanto `user?.id` for false.
 * - Ao montar ou sempre que o usuário muda (`user`), dispara `reloadFavorites()` para sincronizar do servidor.
 * - `reloadFavorites()` busca os favoritos do servidor através de `favorites(user.id)` e atualiza `favoriteProducts`.
 * - `toggleFavorite(productId)`:
 * - Verifica o estado atual via `isFavorite`.
 * - Marca o produto como em carregamento adicionando `productId` em `loadingFavorites`.
 * - Chama `removeFavorite(user.id, productId)` ou `addFavorites(user.id, productId)` conforme necessário.
 * - Recarrega a lista de favoritos chamando `reloadFavorites()` após a operação do servidor.
 * - Trata erros com logs no console e garante a remoção de `productId` de `loadingFavorites` no bloco `finally`.
 * - `isFavorite(productId)` retorna `true` se `favoriteProducts` contiver o produto com o id fornecido.
 *
 * Valor exposto no contexto:
 * - `favoriteProducts: Product[]` — lista atual de produtos favoritos.
 * - `toggleFavorite(productId: number): Promise<void>` — alterna o estado de favorito de um produto.
 * - `isFavorite(productId: number): boolean` — checa se um produto é favorito.
 * - `loadingFavorites: number[]` — lista de ids de produtos atualmente em operação (carregando).
 * - `reloadFavorites(): Promise<void>` — força o recarregamento dos favoritos do servidor.
 *
 * @param children - Nós filhos que consumirão o contexto de favoritos.
 * @returns Componente provedor que envolve os filhos e disponibiliza o contexto de favoritos.
 *
 * @example
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 *
 * @see favorites
 * @see removeFavorite
 * @see addFavorites
 * @public
 */
export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState<number[]>([]);

  const reloadFavorites = async () => {
    try {
      const serverFavorites = await favorites();
      setFavoriteProducts(serverFavorites);
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  };

  const isFavorite = (productId: number) =>
    favoriteProducts.some((product) => product.id === productId);

  const toggleFavorite = async (productId: number) => {
    const currentlyFavorite = isFavorite(productId);
    
    try {
      setLoadingFavorites((prev) => [...prev, productId]);

      if (currentlyFavorite) {
        await removeFavorite(productId);
      } else {
        await addFavorites(productId);
      }

      await reloadFavorites();
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);
    } finally {
      setLoadingFavorites((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteProducts, toggleFavorite, isFavorite, loadingFavorites, reloadFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
