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

export const OrderSituation = ({ order, data, situation, trackingCode, item }: OrderSituationProps) => {
    const { user: u, setUser } = useUser();
    // função secreta...
    const handleCopy = async () => {
        await Clipboard.setStringAsync(trackingCode || "");
        if (!u || !setUser) return;

        const updatedUser = {
            ...u,
            orders: [1, 2, 3]
        } as any;

        setUser(updatedUser);
        console.log(u);
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