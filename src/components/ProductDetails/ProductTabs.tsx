import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Product } from "../../types/Products";

type Props = { product: Product };

export const ProductTabs = ({ product }: Props) => {
  const [tab, setTab] = useState<"description" | "specifications">("description");

  return (
    <View style={{ marginBottom: 20, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: tab === "description" ? "#0063E6" : "#eee",
            borderTopLeftRadius: 8,
          }}
          onPress={() => setTab("description")}
        >
          <Text style={{ color: tab === "description" ? "#fff" : "#333", textAlign: "center" }}>
            Descrição
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            padding: 12,
            backgroundColor: tab === "specifications" ? "#0063E6" : "#eee",
            borderTopRightRadius: 8,
          }}
          onPress={() => setTab("specifications")}
        >
          <Text style={{ color: tab === "specifications" ? "#fff" : "#333", textAlign: "center" }}>
            Especificações
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10 }}>
        {tab === "description" ? (
          <Text style={{ color: "#888" }}>{product.description || "Sem descrição disponível."}</Text>
        ) : (
          <View>
            {product.specifications?.length ? (
              product.specifications.map((spec, idx) => (
                <View
                  key={idx}
                  style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}
                >
                  <Text style={{ color: "#6C7493" }}>{spec.key}</Text>
                  <Text style={{ color: "#000", fontWeight: "600" }}>{spec.value}</Text>
                </View>
              ))
            ) : (
              <Text style={{ color: "#888" }}>Sem especificações disponíveis.</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
