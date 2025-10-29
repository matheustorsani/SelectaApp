import { User } from "../types/User";
import React, { useState, useEffect } from "react";
import { saveUser, getUser } from "../services/UserService";
import { toggleFavorite as toggleFavoriteService } from "../services/FavoriteService";

/**
 * Contexto global responsável por gerenciar o estado do usuário logado na aplicação.
 * 
 * Fornece acesso centralizado às informações do usuário, bem como funções auxiliares
 * para atualizar os dados, manipular favoritos e verificar se um produto está favoritado.
 * 
 * Esse contexto deve envolver a aplicação principal para garantir que
 * os componentes filhos tenham acesso ao estado do usuário.
 * 
 * @context
 * @property {User | null} user - Objeto do usuário atualmente logado (ou `null` se não houver usuário).
 * @property {(user: User | null) => void} setUser - Define ou limpa o usuário atual no contexto e persiste os dados localmente.
 * @property {(productId: number) => void} toggleFavorite - Adiciona ou remove um produto da lista de favoritos do usuário.
 * @property {(productId: number) => boolean} isFavorite - Verifica se um produto está marcado como favorito.
 * 
 * @example
 * ```tsx
 * import { UserProvider, UserContext } from "../hook/useUser";
 * 
 * export default function App() {
 *   return (
 *     <UserProvider>
 *       <MainRoutes />
 *     </UserProvider>
 *   );
 * }
 * 
 * // Dentro de um componente filho:
 * import { useUser } from "../hook/useUser";
 * const { user, setUser, toggleFavorite, isFavorite } = useUser();
 * ```
 */
export const UserContext = React.createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}>({
  user: null,
  setUser: () => { },
  toggleFavorite: () => { },
  isFavorite: () => false,
});

/**
 * Provedor do contexto do usuário.
 * 
 * Gerencia o estado global do usuário e disponibiliza as funções definidas no `UserContext`.
 * Também é responsável por carregar e salvar os dados do usuário localmente.
 * 
 * @component
 * @param {object} props - Propriedades do componente.
 * @param {React.ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 * 
 * @returns O provedor do contexto do usuário, encapsulando os componentes filhos.
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const storedUser = await getUser();
      if (storedUser) setUserState(storedUser);
    })();
  }, []);

  /**
   * Atualiza o estado do usuário e persiste os dados no armazenamento local.
   * 
   * @function
   * @param {User | null} newUser - Novo usuário a ser definido no contexto.
   */
  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    saveUser(newUser);
  };

  /**
   * Alterna o status de favorito de um produto para o usuário atual.
   * 
   * @function
   * @param {number} productId - ID do produto a ser adicionado ou removido dos favoritos.
   */
  const toggleFavorite = (productId: number) => {
    if (!user) return;
    const updatedUser = toggleFavoriteService(user, productId);
    setUser(updatedUser);
  };
  
  /**
   * Verifica se um produto está favoritado pelo usuário atual.
   * 
   * @function
   * @param {number} productId - ID do produto a ser verificado.
   * @returns {boolean} `true` se o produto estiver nos favoritos, `false` caso contrário.
   */
  const isFavorite = (productId: number) => {
    return user?.favorites?.includes(productId) ?? false;
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleFavorite, isFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
