import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

type Props = {
    /** Cor do background */
    bgColor: string;
    /** Cor do icone e texto */
    color: string;
    /** Nome do icone */
    icon?: string;
    /** Texto do card */
    text: string;
    /** Número de itens na linha */
    itens?: number;
    /** Função ao pressionar o card */
    onPress?: () => void;
}

/**
 * Componente OptionCard
 *
 * Cartão clicável que renderiza um ícone e um texto centralizados, com estilo personalizável.
 * Ideal para exibir opções em uma grade/linha responsiva.
 *
 * Largura responsiva:
 * - se `itens > 1`, a largura é calculada como `${(100 / itens) - 10}%` (espaçamento entre itens);
 * - caso contrário, usa 100%.
 *
 * @param bgColor - Cor de fundo do cartão (ex.: "#FFFFFF").
 * @param color - Cor aplicada ao ícone e ao texto (ex.: "#000000").
 * @param icon - Nome/identificador do ícone a ser renderizado.
 * @param text - Texto exibido ao lado do ícone.
 * @param onPress - Função chamada quando o cartão é pressionado.
 * @param itens - Número total de itens na linha/grade usado para calcular a largura.
 *
 * @returns JSX.Element - Um TouchableOpacity configurado como um cartão de opção.
 */
export const OptionCard = ({ bgColor, color, icon, text, onPress, itens = 1 }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 15,
            width: itens > 1 ? `${(100 / itens) - 10}%` : "100%",
            borderWidth: 1,
            borderColor: "#E2E4E9",
            borderRadius: 10,
            gap: 10,
            elevation: 2,
            backgroundColor: bgColor,
        }} onPress={onPress}>
            {icon && <Icon name={icon} color={color} />}
            <Text style={{ color: color }}>{text}</Text>
        </TouchableOpacity >
    );
}
