import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/Products";
import { useProducts } from "./useProducts";

/**
 * Hook para gerenciar os detalhes de um produto específico.
 * Lida com carregamento, erro, quantidade e atualização dos dados do produto.
 *
 * @param {number} productId - ID do produto a ser exibido.
 * @returns {{
 *   product: Product | undefined;
 *   loading: boolean;
 *   amount: number;
 *   error: string | null;
 *   toggleAmount: (increment: boolean) => void;
 * }}
 */
export function useProductDetails(productId: number) {
  const { products, loading: productsLoading, loadProducts, error: productsError } = useProducts();

  const [product, setProduct] = useState<Product>();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /** Atualiza o estado do produto conforme o ID atual */
  const updateProduct = useCallback(() => {
    const found = products.find((p) => p.id === productId);
    setProduct(found);
    setAmount(1);
    setError(!found && !productsLoading ? "Produto não encontrado." : null);
    setLoading(false);
  }, [products, productId, productsLoading]);

  /** Recarrega os produtos se ainda não existirem, ou apenas atualiza o atual */
  useEffect(() => {
    if (productsLoading) return setLoading(true);

    if (products.length === 0) {
      loadProducts().then(updateProduct);
    } else {
      updateProduct();
    }
  }, [products, productsLoading, loadProducts, updateProduct]);

  /** Incrementa ou decrementa a quantidade respeitando os limites */
  const toggleAmount = useCallback(
    (increment: boolean) => {
      if (!product) return;

      setAmount((prev) => {
        let next = increment ? prev + 1 : prev - 1;
        if (next < 1) next = 1;

        const maxAmount = product.amount ?? 1;
        if (next > maxAmount) {
          setError("Quantidade máxima atingida");
          setTimeout(() => setError(null), 2000);
          next = maxAmount;
        }

        return next;
      });
    },
    [product]
  );

  return {
    product,
    loading,
    amount,
    error: error || productsError,
    toggleAmount,
  };
}
