import React from "react";
import { View, Text } from "react-native";
import { Product } from "../../types/Products";

type Props = { product: Product };
/** 
 * Componente que exibe o preço do produto, incluindo desconto se aplicável.
 * 
 * @param {Props} props - Produto com preço e possível desconto.
 * @returns Componente exibindo o preço do produto.
 */
export const ProductPrice = ({ product }: Props) => {
  const hasDiscount = product.discount;
  const finalPrice = hasDiscount
    ? product.price - (product.price * (product.discount! / 100))
    : product.price;

  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 25, color: "#0063E6", fontWeight: "bold" }}>
          R$ {finalPrice.toFixed(2)}
        </Text>
        {hasDiscount && (
          <Text
            style={{
              color: "#888",
              fontWeight: "bold",
              fontSize: 13,
              textDecorationLine: "line-through",
              marginLeft: 8,
            }}
          >
            R$ {product.price.toFixed(2)}
          </Text>
        )}
      </View>

      {hasDiscount && (
        <Text style={{ color: "green", fontSize: 12, marginTop: 4 }}>
          Economia de R$ {(product.price * (product.discount! / 100)).toFixed(2)}
        </Text>
      )}
    </View>
  );
};
