import React, { createContext, useEffect, useState } from "react";
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
