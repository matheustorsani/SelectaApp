import React from "react"
import { View, Text } from "react-native"

type MyProductsCardProps = {
    /** Número ou valor a ser exibido no cartão. */
    number: string | number;
    /** Texto descritivo do cartão. */
    text: string;
    /** Cor do número ou valor exibido. */
    color: string;
}
/**
 * Componente de cartão para exibir informações resumidas de produtos.
 * 
 * @param {MyProductsCardProps} props - Propriedades do cartão, incluindo número, texto e cor.
 * @returns 
 */
export const MyProductsCard = ({ number, text, color }: MyProductsCardProps) => {
    return (
        <View style={{
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 20,
            flexDirection: 'column',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E2E4E9',
        }}>
            <Text style={{ color: color, fontSize: 25, fontWeight: "bold" }}>{number}</Text>
            <Text style={{ color: "#6C7493" }}>{text}</Text>
        </View>
    )
}