import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/Products";
import { useProducts } from "./useProducts";

export function useProductDetails(productId: number) {
  const { products, loading: productsLoading, loadProducts, error: productsError } = useProducts();

  const [product, setProduct] = useState<Product | undefined>();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const updateProduct = useCallback(() => {
    const found = products.find((p) => p.id === productId);
    setProduct(found);
    setAmount(1);

    if (!found && !productsLoading) {
      setError("Produto não encontrado.");
    } else {
      setError(null);
    }

    setLoading(false);
  }, [products, productId, productsLoading]);

  useEffect(() => {
    if (productsLoading) {
      setLoading(true);
      return;
    }

    if (products.length === 0) {
      loadProducts().then(updateProduct);
    } else {
      updateProduct();
    }
  }, [products, productId, productsLoading, loadProducts, updateProduct]);

  const toggleAmount = (increment: boolean) => {
    if (!product) return;

    setAmount((prev) => {
      let next = increment ? prev + 1 : prev - 1;

      if (next < 1) next = 1;

      if (next > (product.amount ?? 1)) {
        setError("Quantidade máxima atingida");
        setTimeout(() => setError(null), 2000);
        next = product.amount!;
      }

      return next;
    });
  };

  return { product, loading, amount, error: error || productsError, toggleAmount };
}
