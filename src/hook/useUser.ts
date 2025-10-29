import { useContext } from "react";
import { UserContext } from "../context/UserContext";

/**
 * Hook para acessar o contexto do usuário.
 * 
 * @returns {{
 *   user: import("../types/User").User | null;
 *   setUser: (user: import("../types/User").User | null) => void;
 *   toggleFavorite: (productId: number) => void;
 *   isFavorite: (productId: number) => boolean;
 * }}
 * Retorna o contexto do usuário, incluindo informações e funções utilitárias.
 */
export function useUser(): {
  user: import("../types/User").User | null;
  setUser: (user: import("../types/User").User | null) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
} {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um <UserProvider>");
  }

  return context;
}
