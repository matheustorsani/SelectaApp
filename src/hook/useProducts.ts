import { useEffect, useState, useCallback } from "react";
import { Product } from "../data/Products";
import { allProducts, searchProducts } from "../services/apiService";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    //const [page, setPage] = useState(1); // caso o cauã pagine ja ta suave

    const loadProducts = useCallback(async () => {
        if (loading) return;
        setLoading(true);
        try {
            const newProducts = await allProducts();
            setProducts(prev => [...prev, ...newProducts]);
            //setPage(prev => prev + 1);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        } finally {
            setLoading(false);
        }
    }, [loading]);

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
