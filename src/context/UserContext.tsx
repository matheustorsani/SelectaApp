import { User } from "../types/User";
import React, { useState, useEffect } from "react";
import { saveUser, getUser } from "../services/UserService";
import { Product } from "../types/Products";
import { favorites } from "../services/api/favorites/favorites";
import { removeFavorite } from "../services/api/favorites/removeFavorites";
import { addFavorites } from "../services/api/favorites/addFavorites";

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
  favoriteProducts: Product[];
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
  reloadFavorites: (userId?: number) => Promise<void>;
  loadingFavorites: number[];
}>({
  user: null,
  setUser: () => { },
  favoriteProducts: [],
  toggleFavorite: async () => { },
  isFavorite: () => false,
  reloadFavorites: async () => { },
  loadingFavorites: [],
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
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUserState(storedUser);
        try {
          const serverFavorites = await favorites(storedUser.id!);
          setFavoriteProducts(serverFavorites);
        } catch (error) {
          console.error("Erro ao carregar favoritos do usuário:", error);
        }
      }
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
   * Verifica se um produto está favoritado pelo usuário atual.
   * 
   * @function
   * @param {number} productId - ID do produto a ser verificado.
   * @returns {boolean} `true` se o produto estiver nos favoritos, `false` caso contrário.
   */
  const isFavorite = (productId: number) => {
    return favoriteProducts.some((p) => p.id === productId);
  };

  /**
  * Recarrega a lista de produtos favoritos do usuário e atualiza o estado local.
  *
  * Esta função obtém o ID do usuário a partir do parâmetro opcional `userId` ou, se não
  * fornecido, do usuário atualmente armazenado no contexto (`user?.id`). Se nenhum ID
  * estiver disponível, a função retorna imediatamente sem realizar nenhuma operação.
  *
  * Em seguida, solicita ao servidor a lista de favoritos através da função `favorites(id)`
  * e atualiza o estado local chamando `setFavoriteProducts` com os resultados obtidos.
  * Erros durante a requisição são capturados e registrados no console, sem propagar exceções.
  *
  * @async
  * @param {number} [userId] - ID do usuário a partir do qual recarregar os favoritos. Se não fornecido, usa o ID do usuário atual no contexto.
  * @returns {Promise<void>} Uma Promise que é resolvida após a tentativa de recarregar os favoritos (ou imediatamente se não houver ID).
  * @remarks
  * - Efeito colateral: atualiza o estado `favoriteProducts` no contexto.
  * - Erros de rede ou de resposta são tratados localmente (logados com `console.error`) e não são lançados.
  *
  * @example
  * // Recarrega os favoritos do usuário atual no contexto
  * await reloadFavorites();
  *
  * @example
  * // Recarrega os favoritos do usuário com ID 42
  * await reloadFavorites(42);
  */
  const reloadFavorites = async (userId?: number) => {
    const id = userId ?? user?.id;
    if (!id) return;
    try {
      const serverFavorites = await favorites(id);
      setFavoriteProducts(serverFavorites);
    } catch (error) {
      console.error("Erro ao carregar favoritos do usuário:", error);
    }
  };

  /**
   * Alterna o status de favorito de um produto para o usuário atual.
   * 
   * @function
   * @param {number} productId - ID do produto a ser adicionado ou removido dos favoritos.
  */
  const toggleFavorite = async (productId: number) => {
    if (!user || !user.id) return;
    const currentlyFavorite = isFavorite(productId);
    try {
      setLoadingFavorites((prev) => [...prev, productId]);
      if (currentlyFavorite) {
        await removeFavorite(user.id, productId);
      } else {
        await addFavorites(user.id, productId);
      }
      await reloadFavorites();
    } catch (error) {
      console.error("Erro ao sincronizar favoritos com o servidor", error);
    } finally {
      setLoadingFavorites((prev) => prev.filter((id) => id !== productId));
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, favoriteProducts, toggleFavorite, isFavorite, reloadFavorites, loadingFavorites }}
    >
      {children}
    </UserContext.Provider>
  );
};
