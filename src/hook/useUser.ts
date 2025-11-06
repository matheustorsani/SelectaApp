import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../types/User";
/**
 * Hook para acessar o contexto do usuário.
 * 
 * @returns {{
 *   user: User | null;
 *   setUser: (user: User | null) => void;
 *   logout: () => void;
 * }}
 * Retorna o contexto do usuário, incluindo informações e funções utilitárias.
 */
export function useUser(): {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
} {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um <UserProvider>");
  }

  return context;
}
