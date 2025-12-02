import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "../types/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchProducts } from "../services/api/home/searchProducts";
import { allProducts } from "../services/api/products/allProducts";

const CACHE_KEY = "@Selecta:products_cache";

/**
 * Hook para gerenciar a listagem de produtos.
 * Inclui cache local, busca, controle de erros e tentativas automáticas.
 *
 * @returns {{
 *   products: Product[];
 *   loading: boolean;
 *   error: string | null;
 *   loadProducts: () => Promise<void>;
 *   search: (query: string) => Promise<void>;
 * }}
 */
export function useProducts(): {
  products: Product[];
  loading: boolean;
  error: string | null;
  loadProducts: () => Promise<void>;
  search: (query: string) => Promise<void>;
} {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  /**
   * Executa uma função de busca com tentativas e fallback em cache.
   */
  const fetchWithRetry = useCallback(
    async (fn: () => Promise<Product[]>, retries = 3, shouldCache = false) => {
      setLoading(true);
      setError(null);

      for (let i = 0; i < retries; i++) {
        try {
          const data = await fn();
          setProducts(data);

          if (shouldCache) {
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
          }

          setLoading(false);
          return;
        } catch (err: any) {

          if (err?.code === "API_OFFLINE" || err instanceof Error && (err as any).code === "API_OFFLINE") {
            console.warn("API offline.");
            setError("A API está offline no momento. Por favor, tente novamente mais tarde.");
            setLoading(false);
            return;
          }

          console.warn(`Tentativa ${i + 1} falhou:`, err?.message || err);
          if (i === retries - 1) {
            setError("Não foi possível carregar os produtos. Verifique sua conexão.");
            setLoading(false);
          } else {
            await new Promise((res) => setTimeout(res, 1000));
          }
        }
      }
    },
    []
  );

  /**
   * Carrega produtos, priorizando cache local antes de consultar a API.
   */
  const loadProducts = useCallback(async () => {
    if (hasLoaded.current && products.length > 0 && !error) return;
    hasLoaded.current = true;

    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as Product[];
        setProducts(parsed);
      }
    } catch (err) {
      console.warn("Erro ao carregar cache:", err);
    }

    await fetchWithRetry(allProducts, 3, true);
  }, [fetchWithRetry, products.length, error]);

  /**
   * Pesquisa produtos por nome ou termo.
   * Caso a query esteja vazia, recarrega todos os produtos.
   */
  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) return fetchWithRetry(allProducts, 3, true);
      await fetchWithRetry(() => searchProducts(query));
    },
    [fetchWithRetry]
  );

  useEffect(() => {
    if (!hasLoaded.current) {
      loadProducts()
    };
  }, [loadProducts]);

  return { products, loading, loadProducts, search, error };
}
