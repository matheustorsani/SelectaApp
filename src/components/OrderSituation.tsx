import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Product } from "../types/Products"
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFE from 'react-native-vector-icons/Feather';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';

type OrderSituationProps = {
    order: string;
    data: string;
    situation: "Entregue" | "Em Trânsito" | "Processando";
    trackingCode?: string;
    onPress?: () => void;
    item?: Product;
}

const statusColors: Record<string, string> = {
    "Entregue": "#21C45D",
    "Em Trânsito": "#1D77ED",
    "Processando": "#F59F0A",
};

const statusIcons: Record<string, string> = {
    "Entregue": "check-circle-outline",
    "Em Trânsito": "local-shipping",
    "Processando": "hourglass-empty",
};
/**
 * Componente responsável por exibir o status de um pedido, incluindo:
 * - Código do pedido e data;
 * - Situação atual (Processando, Em Trânsito ou Entregue);
 * - Produto associado (nome, quantidade e preço);
 * - Código de rastreamento (com opção de copiar);
 * 
 * Também inclui ícones e cores dinâmicas conforme o status do pedido.
 * 
 * @component
 * @param {OrderSituationProps} props - Propriedades do componente.
 * @param {string} props.order - Número do pedido.
 * @param {string} props.data - Data do pedido.
 * @param {"Entregue" | "Em Trânsito" | "Processando"} props.situation - Situação atual do pedido.
 * @param {string} [props.trackingCode] - Código de rastreamento do pedido (opcional).
 * @param {Product} [props.item] - Produto relacionado ao pedido (opcional).
 * 
 * @returns Um componente visual que mostra as informações do pedido e seu status.
 * 
 * @example
 * ```tsx
 * <OrderSituation
 *   order="12345"
 *   data="25/10/2025"
 *   situation="Em Trânsito"
 *   item={{ name: "Camiseta Azul", amount: 1, price: 89.90 }}
 *   onPress={() => navigation.navigate("OrderStatus")}
 * />
 * ```
 */
export const OrderSituation = ({ order, data, situation, item, onPress }: OrderSituationProps) => {
    return (
        <View style={{ padding: 16, backgroundColor: "#fff", borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: "#d1d1d1ff", position: "relative" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 15 }}>
                <View style={{ flexDirection: "column" }}>
                    <Text>Pedido {order}</Text>
                    <Text style={{ color: "gray" }}>{data}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 20, backgroundColor: statusColors[situation], paddingHorizontal: 10, width: "auto", justifyContent: "center", height: 30 }}>
                    <Icon name={statusIcons[situation]} style={{ color: "white" }} size={18} />
                    <Text style={{ fontWeight: "bold", color: "white" }}>{situation}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <IconFE name="package" size={25} style={{ backgroundColor: "#F3F4F6", color: "#6C7493", padding: 10, borderRadius: 10 }} />
                <View style={{ flexDirection: "column" }}>
                    <Text>{item?.name}</Text>
                    <Text style={{ color: "#6C7493", fontSize: 13.2 }}>Qtd: {item?.amount || 1} • R${item?.price}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", borderTopColor: "#d1d1d1ff", borderTopWidth: 1, paddingTop: 10 }}>
                <View>
                    <Text style={{ color: "#6C7493" }}>Total</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 16, color: "#1D77ED" }}>R${item?.price}</Text>
                </View>
                <TouchableOpacity onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text>Ver detalhes</Text>
                    <IconSLI name="arrow-right" color="#000" size={10} />
                </TouchableOpacity>
            </View>
        </View>
    )
}