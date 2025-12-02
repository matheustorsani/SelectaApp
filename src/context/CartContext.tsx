import React, { createContext, useState } from "react";
import { Product } from "../types/Products";
import { getProductsInCart } from "../services/api/client/getProductsInCart";
import { addToCart } from "../services/api/client/addToCart";
import { removeFromCart } from "../services/api/client/removeFromCart";

export const CartContext = createContext<{
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    reloadCart: () => Promise<any>;
    add: (productId: number, quantity: number) => Promise<void>;
    remove: (productId: number) => Promise<void>;
    loadingCart: number[];
    message: string | null;
    errorMessage: string | null;
    loading: boolean;
} | null>(null);

/**
 * Provider do contexto do carrinho de compras.
 *
 * Fornece estados e operações para gerenciar os produtos no carrinho, mensagens de sucesso/erro e indicadores de carregamento.
 *
 * @remarks
 * Utilizado como componente de nível superior para envolver a árvore de componentes que necessita acessar ou modificar o carrinho.
 *
 * @param props.children - Elementos React que serão renderizados dentro do provider.
 *
 * Estados mantidos:
 * - cartProducts: Product[] — lista de produtos atualmente no carrinho.
 * - loadingCart: number[] — lista de IDs de produtos que estão em operação (adicionando/removendo) para controlar spinners por item.
 * - message: string | null — mensagem de sucesso transitória exibida para o usuário.
 * - errorMessage: string | null — mensagem de erro transitória exibida para o usuário.
 * - loading: boolean — indicador global de carregamento para operações do carrinho.
 *
 * Métodos expostos:
 * - reloadCart(): Promise<Product[]>
 *   - Descrição: Busca os produtos do carrinho (via API), atualiza o estado cartProducts e retorna o array de produtos.
 *   - Em caso de erro: define errorMessage, registra no console e retorna um array vazio.
 *   - Retorno: Promise que resolve com Product[].
 *
 * - add(productId: number, quantity: number): Promise<void | undefined>
 *   - Descrição: Adiciona um produto ao carrinho, controla os estados loading e loadingCart, chama reloadCart ao final e define uma mensagem de sucesso.
 *   - Em caso de erro: define errorMessage e limpa os estados de loading.
 *   - Observação: garante que o ID do produto seja removido de loadingCart no bloco finally.
 *
 * - remove(productId: number): Promise<void>
 *   - Descrição: Remove um produto do carrinho, controla loading e loadingCart, chama reloadCart e define mensagem de sucesso.
 *   - Em caso de erro: define errorMessage, registra no console e limpa estados de loading.
 *   - Observação: garante limpeza do ID do produto em loadingCart no bloco finally.
 *
 * @see useCart para consumir o contexto em componentes funcionais.
 *
*/
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [loadingCart, setLoadingCart] = useState<number[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const reloadCart = async () => {
        try {
            const data = await getProductsInCart();
            setCartProducts(data || []);
            return data || [];
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao recarregar o carrinho.")
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000)
            console.error("Erro ao carregar carrinho:", error);
            return [];
        }
    };

    const add = async (productId: number, quantity: number) => {
        try {
            setLoading(true);
            setLoadingCart(prev => [...prev, productId]);

            await addToCart(productId, quantity);
            await reloadCart();
            return setMessage("Produto adicionado no carrinho!")
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao adicionar produto no carrinho. (Produto ja adicionado)")
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000)
            setLoading(false);
        } finally {
            setLoadingCart(prev => prev.filter(id => id !== productId));
            setLoading(false);
        }
    };

    const remove = async (productId: number) => {
        try {
            setLoading(true);

            setLoadingCart(prev => [...prev, productId]);

            await removeFromCart(productId);
            await reloadCart();
            setMessage("Produto removido do carrinho.")
        } catch (error) {
            setErrorMessage("Ocorreu um erro ao remover produto.")
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000)
            console.error("Erro ao remover do carrinho:", error);
            setLoading(false);
        } finally {
            setLoading(false);
            setLoadingCart(prev => prev.filter(id => id !== productId));
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                setCartProducts,
                reloadCart,
                add,
                remove,
                loadingCart,
                message,
                errorMessage,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
