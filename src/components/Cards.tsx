import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  /** Número ou valor a ser exibido no cartão. */
  number: string | number;
  /** Texto descritivo do cartão. */
  text: string;
  /** Cor do número ou valor exibido. */
  color: string;
}

/**
 * Cards — componente estilizado para exibir KPIs e estatísticas.
 * Visual moderno, espaçamento proporcional e sombra suave.
 */
export const Cards = ({ number, text, color }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.number, { color }]}>{number}</Text>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F1F1F3",
  },

  number: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },

  label: {
    fontSize: 14,
    color: "#6C7493",
    fontWeight: "500",
  },
});
