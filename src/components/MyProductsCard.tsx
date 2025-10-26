import React from "react"
import { View, Text } from "react-native"

type MyProductsCardProps = {
    number: string | number;
    text: string;
    color: string;
}

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