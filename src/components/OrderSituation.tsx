import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Product } from "../types/Products"
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFE from 'react-native-vector-icons/Feather';
import IconSLI from 'react-native-vector-icons/SimpleLineIcons';
import * as Clipboard from "expo-clipboard";
import { useUser } from "../hook/useUser";

type OrderSituationProps = {
    order: string;
    data: string;
    situation: "Entregue" | "Em Trânsito" | "Processando";
    trackingCode?: string;
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
 *   trackingCode="BR123456789"
 *   item={{ name: "Camiseta Azul", amount: 1, price: 89.90 }}
 * />
 * ```
 */
export const OrderSituation = ({ order, data, situation, trackingCode, item }: OrderSituationProps) => {
    const { user, setUser } = useUser();

    /**
     * Copia o código de rastreamento para a área de transferência.
     * Também atualiza o usuário local (apenas para fins de teste).
     * Você pode editar essa função para testar ou integrar com sua lógica real de atualização de usuário.
     * 
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const handleCopy = async (): Promise<void> => {
        await Clipboard.setStringAsync(trackingCode || "");
        if (!user || !setUser) return;

        const updatedUser = {
            ...user,
            orders: [1, 2, 3]
        } as any;

        setUser(updatedUser);
        console.log(user);
    }

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
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                    <Text>Ver detalhes</Text>
                    <IconSLI name="arrow-right" color="#000" size={10} />
                </TouchableOpacity>
            </View>

            {trackingCode && (
                <View style={{ marginTop: 10, borderRadius: 8, padding: 10, backgroundColor: "#F3F4F6" }}>
                    <Text style={{ color: "#6C7493", fontSize: 13.2 }}>Código de rastreamento:</Text>
                    <TouchableOpacity onPress={handleCopy} activeOpacity={0.7} style={{ alignSelf: "flex-start", marginTop: 6 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ textDecorationLine: "underline", color: "#000" }}>{trackingCode}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}