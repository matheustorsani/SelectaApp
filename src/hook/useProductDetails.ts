import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import { Product } from "../types/Products";

export function useProductDetails(productId: number) {
  const { products, loading } = useProducts();
  const [product, setProduct] = useState<Product | undefined>();
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<number | null>(null);

  useEffect(() => {
    if (products.length === 0) return;

    const found = products.find((p) => p.id === productId);
    setProduct(found);
    setAmount(1);
    setPrevId(productId);
  }, [products, productId]);

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

  return { product, loading, amount, error, toggleAmount };
}
