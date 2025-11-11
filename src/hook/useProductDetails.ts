import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/Products";
import { getProductById } from "../services/api/products/getProductById";

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
  const [product, setProduct] = useState<Product>();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const fetch = await getProductById(productId);

      if (!fetch) {
        setError("Produto não encontrado.");
        setProduct(undefined);
      } else {
        setProduct(fetch);
        setError(null);
        setAmount(1);
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar produto.");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

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
    error,
    toggleAmount
  };
}
