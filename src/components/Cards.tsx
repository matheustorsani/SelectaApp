import React from "react"
import { View, Text } from "react-native"


type Props = {
    /** Número ou valor a ser exibido no cartão. */
    number: string | number;
    /** Texto descritivo do cartão. */
    text: string;
    /** Cor do número ou valor exibido. */
    color: string;
}


/**
 * Componente Cards
 *
 * Renderiza um cartão de estatísticas com um valor em destaque e um texto descritivo.
 *
 * Destinado a dashboards e visões de métricas para exibir contadores, indicadores ou KPIs de forma compacta.
 *
 * @returns JSX.Element — um cartão estilizado contendo o valor e sua descrição.
 */
export const Cards = ({ number, text, color }: Props) => {
    return (
        <View style={{
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginBottom: 20,
            flexDirection: 'column',
            alignItems: 'center',
            borderWidth: 1,
            elevation: 2,
            borderColor: '#E2E4E9',
        }}>
            <Text style={{ color: color, fontSize: 25, fontWeight: "bold" }}>{number}</Text>
            <Text style={{ color: "#6C7493" }}>{text}</Text>
        </View>
    )
}
