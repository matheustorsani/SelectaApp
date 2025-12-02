import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/Products";
import { getProductById } from "../services/api/products/getProductById";

/**
 * Hook para buscar e controlar detalhes de um produto específico.
 *
 * Realiza a requisição do produto pelo ID fornecido (getProductById) e expõe o estado
 * resultante: o produto, indicador de carregamento, quantidade selecionada, mensagem
 * de erro e uma função para ajustar a quantidade.
 *
 * Comportamentos principais:
 * - Ao iniciar a busca, `loading` é true; ao terminar, volta para false.
 * - Se o produto não for encontrado, `product` fica indefinido e `error` recebe
 *   "Produto não encontrado.".
 * - Em caso de erro na requisição, `error` recebe "Erro ao carregar produto.".
 * - Ao carregar um produto com sucesso, a `amount` é reiniciada para 1 e `error` é limpo.
 * - `toggleAmount(increment)` ajusta a quantidade:
 *   - Não faz nada se `product` estiver indefinido.
 *   - A quantidade mínima é 1.
 *   - A quantidade máxima é `product.amount` (ou 1, caso este campo seja indefinido).
 *   - Se tentativa de ultrapassar o máximo, `error` recebe "Quantidade máxima atingida"
 *     e a mensagem é limpa automaticamente após 2 segundos.
 *
 * @param productId - ID numérico do produto a ser carregado.
 *
 * @returns Um objeto contendo:
 *  - product: Product | undefined — o produto carregado (ou undefined se não encontrado).
 *  - loading: boolean — indica se a requisição está em andamento.
 *  - amount: number — quantidade selecionada (mínimo 1, máximo definido por product.amount).
 *  - error: string | null — mensagem de erro atual, ou null se não houver erro.
 *  - toggleAmount: (increment: boolean) => void — função para incrementar (true) ou decrementar (false) a quantidade.
 *
 * @remarks
 * - O hook depende de `productId`; toda mudança nesse ID dispara nova busca.
 * - O hook usa internamente setTimeout para limpar automaticamente mensagens de erro de limite atingido.
 *
 * @example
 * // Uso em componente React:
 * const { product, loading, amount, error, toggleAmount } = useProductDetails(123);
 */
export function useProductDetails(productId: number): {
  product: Product | undefined;
  loading: boolean;
  amount: number;
  error: string | null;
  toggleAmount: (increment: boolean) => void;
} {
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
