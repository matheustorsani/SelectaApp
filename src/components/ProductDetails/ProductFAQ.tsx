import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";


/**
 * @returns Componente de Perguntas Frequentes do Produto.
 */
export const ProductFAQ = () => (
  <View style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 12 }}>
      Perguntas Frequentes
    </Text>
    <Button mode="contained" style={{ backgroundColor: "#0063E6", marginBottom: 12 }}>
      Pergunte
    </Button>

    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#007AFF", marginRight: 6 }} />
      <Text style={{ fontWeight: "bold" }}>Este produto tem garantia?</Text>
    </View>
    <Text style={{ color: "#888", marginBottom: 8, paddingLeft: 10 }}>
      R: Sim, possui garantia de 1 ano contra defeitos de fabricação.
    </Text>
  </View>
);
