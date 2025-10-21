import { useEffect, useState, useCallback } from "react";
import { Product } from "../types/Products";
import { allProducts, searchProducts } from "../services/ApiService";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const newProducts = await allProducts();
            setProducts(newProducts);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const search = useCallback(async (query: string) => {
        if (!query.trim()) return setProducts(await allProducts());
        setLoading(true);
        try {
            const results = await searchProducts(query);
            setProducts(results);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    return { products, loading, loadProducts, search };
}
