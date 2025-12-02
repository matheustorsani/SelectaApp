import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Product } from "../types/Products";

/**
 * Hook para acessar o estado e as ações do carrinho de compras.
 *
 * @remarks
 * Este hook recupera o contexto do carrinho (CartContext) e o retorna para uso em componentes React.
 * IMPORTANTE: para entender exatamente o que cada campo do objeto retornado representa, consultar CartContext.
 *
 * @throws {Error} Lança um erro se usado fora do CartProvider: "useCart deve ser usado dentro do CartProvider".
 *
 * @returns {{
 *   cartProducts: Product[]; // Lista de produtos atualmente no carrinho
 *   setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>; // Setter para substituir a lista de produtos
 *   reloadCart: () => Promise<any>; // Recarrega/atualiza o carrinho a partir da fonte de verdade (ex.: API/localStorage)
 *   add: (productId: number, quantity: number) => Promise<void>; // Adiciona uma quantidade do produto indicado ao carrinho
 *   remove: (productId: number) => Promise<void>; // Remove o produto indicado do carrinho
 *   loadingCart: number[]; // Array de IDs de produtos que estão em estado de carregamento
 *   message: string | null; // Mensagem informativa (ex.: sucesso)
 *   errorMessage: string | null; // Mensagem de erro, quando aplicável
 *   loading: boolean; // Indica se uma operação global de carregamento do carrinho está em progresso
 * }}
 *
 * @see {@link CartContext} - Consulte a definição e documentação do contexto para detalhes completos sobre cada campo retornado.
 */
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
