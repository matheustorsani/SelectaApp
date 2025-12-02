import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/Products";

export const useCart = (): {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    reloadCart: () => Promise<any>;
    add: (productId: number, quantity: number) => Promise<void>;
    remove: (productId: number) => Promise<void>;
    loadingCart: number[];
    message: string | null;
    errorMessage: string | null;
    loading: boolean;
} => {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart deve ser usado dentro do CartProvider");
  
  return context;
};
