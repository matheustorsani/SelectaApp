import { useEffect, useState, useCallback, useRef } from "react";
import { Product } from "../types/Products";
import { allProducts, searchProducts } from "../services/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "cache";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const hasLoaded = useRef(false);

    const fetchWithRetry = useCallback(async (fn: () => Promise<Product[]>, retries = 3, cache = false) => {
        setLoading(true);
        setError(null);



        for (let i = 0; i < retries; i++) {
            try {
                const data = await fn();
                setProducts(data);

                if (cache) {
                    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
                }

                setLoading(false);
                return;
            } catch (err: any) {
                console.warn(`Tentativa ${i + 1} falhou:`, err.message || err);
                if (i === retries - 1) {
                    setError("Não foi possível carregar os produtos. Verifique sua conexão.");
                    setLoading(false);
                } else {
                    await new Promise((res) => setTimeout(res, 1000))
                }
            }
        }
    }, []);

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

    const search = useCallback(async (query: string) => {
        if (!query.trim()) return fetchWithRetry(allProducts, 3, true);
        await fetchWithRetry(() => searchProducts(query));
    }, [fetchWithRetry]);

    useEffect(() => {
        if (!hasLoaded) loadProducts();
    }, [hasLoaded, loadProducts]);

    return { products, loading, loadProducts, search, error };
}
