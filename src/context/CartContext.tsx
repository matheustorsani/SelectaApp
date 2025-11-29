import React, { createContext, useState } from "react";
import { Product } from "../types/Products";
import { getProductsInCart } from "../services/api/client/getProductsInCart";
import { addToCart } from "../services/api/client/addToCart";
import { removeFromCart } from "../services/api/client/removeFromCart";

export const CartContext = createContext<{
    cartProducts: Product[];
    reloadCart: () => Promise<void>;
    add: (productId: number, quantity: number) => Promise<void>;
    remove: (productId: number) => Promise<void>;
    loadingCart: number[];
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const [loadingCart, setLoadingCart] = useState<number[]>([]);

    const reloadCart = async () => {
        try {
            const data = await getProductsInCart();
            setCartProducts(data);
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
        }
    };

    const add = async (productId: number, quantity: number) => {
        try {
            setLoadingCart(prev => [...prev, productId]);

            await addToCart(productId, quantity);
            await reloadCart();
        } catch (error) {
            console.error("Erro ao adicionar ao carrinho:", error);
        } finally {
            setLoadingCart(prev => prev.filter(id => id !== productId));
        }
    };

    const remove = async (productId: number) => {
        try {
            setLoadingCart(prev => [...prev, productId]);

            await removeFromCart(productId);
            await reloadCart();
        } catch (error) {
            console.error("Erro ao remover do carrinho:", error);
        } finally {
            setLoadingCart(prev => prev.filter(id => id !== productId));
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                reloadCart,
                add,
                remove,
                loadingCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
