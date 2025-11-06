import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { User } from "../types/User";
import { Product } from "../types/Products";

/**
 * Hook para acessar o contexto do usuário.
 * 
 * @returns {{
 *   user: User | null;
 *   setUser: (user: User | null) => void;
 *   favoriteProducts: Product[];
 *   toggleFavorite: (productId: number) => Promise<void>;
 *   isFavorite: (productId: number) => boolean;
 *   reloadFavorites: (userId?: number) => Promise<void>;
 * }}
 * Retorna o contexto do usuário, incluindo informações e funções utilitárias.
 */
export function useUser(): {
  user: User | null;
  setUser: (user: User | null) => void;
  favoriteProducts: Product[];
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  reloadFavorites: (userId?: number) => Promise<void>;
  loadingFavorites: number[];
} {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um <UserProvider>");
  }

  return context;
}
