import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "../types/Products";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchProducts } from "../services/api/home/searchProducts";
import { allProducts } from "../services/api/products/allProducts";

const CACHE_KEY = "@Selecta:products_cache";

/**
 * Hook para carregar e buscar produtos com tratamento de cache, tentativas e estados de carregamento/erro.
 *
 * Comportamento principal
 * - Carrega a lista de produtos a partir da API (função allProducts) e mantém o resultado em estado local.
 * - Mantém estados reativos: `products`, `loading` e `error`.
 * - Usa AsyncStorage para cache local (chave definida em CACHE_KEY). Se houver cache válido, ele é carregado antes da primeira requisição de rede.
 * - Implementa uma rotina de retry (por padrão 3 tentativas) com delay incremental fixo de 1s entre tentativas.
 * - Se a API sinalizar que está offline (erro com `.code === "API_OFFLINE"`), o hook define mensagem de erro específica e interrompe novas tentativas.
 * - Evita múltiplos carregamentos desnecessários usando a ref interna `hasLoaded`.
 *
 * Funções expostas
 * - loadProducts(): Promise<void>
 *   - Executa o fluxo de carregamento dos produtos.
 *   - Lê o cache (AsyncStorage) se presente e então tenta atualizar a lista a partir da API.
 *   - Não re-executa a carga se já tiver sido feita com sucesso (controle por hasLoaded + products.length + erro).
 *
 * - search(query: string): Promise<void>
 *   - Se `query` for string vazia ou apenas espaços, faz o carregamento padrão (allProducts) e atualiza/usa cache.
 *   - Caso contrário, executa a busca via searchProducts(query) e atualiza o estado `products`.
 *
 * Estados retornados
 * - products: Product[]
 *   - Array atual de produtos carregados/consultados.
 * - loading: boolean
 *   - Indica se há uma operação de rede em andamento.
 * - error: string | null
 *   - Mensagem de erro legível (em português) quando falhas acontecem ou quando a API está offline.
 *
 * Observações de implementação e efeitos colaterais
 * - Persiste os resultados bem-sucedidos em AsyncStorage (CACHE_KEY) quando a chamada de rede for bem-sucedida e `shouldCache` estiver habilitado.
 * - Tratamento de erros:
 *   - Para falhas transitórias, o hook tenta novamente até o número de retries configurado.
 *   - Quando esgotadas as tentativas, define `error` com mensagem genérica de verificação de conexão.
 * - Dependências externas esperadas no escopo:
 *   - allProducts(): Promise<Product[]>
 *   - searchProducts(query: string): Promise<Product[]>
 *   - AsyncStorage e constante CACHE_KEY
 * - Concorrência/race conditions:
 *   - O hook atualiza estados (`products`, `loading`, `error`) diretamente no fluxo assíncrono; se múltiplas chamadas paralelas forem iniciadas externamente, o último resultado a resolver determinará o estado.
 *
 * Exemplo de uso
 * - const { products, loading, error, loadProducts, search } = useProducts();
 * - useEffect(() => { loadProducts(); }, []);
 *
 * Observações de uso
 * - Ideal para componentes que precisam de uma lista global/compartilhada de produtos com cache local.
 * - Em apps com múltiplos componentes consumindo o mesmo hook, considerar extrair a lógica para um contexto/global store para evitar chamadas redundantes.
 *
 * @returns Objeto com { products, loading, error, loadProducts, search }.
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
