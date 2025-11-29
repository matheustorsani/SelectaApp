import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Product } from "../types/Products";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconFE from "react-native-vector-icons/Feather";
import IconSLI from "react-native-vector-icons/SimpleLineIcons";

interface Props {
    order: string;
    data: string;
    situation: "Entregue" | "Em Trânsito" | "Processando";
    trackingCode?: string;
    onPress?: () => void;
    item?: Product;
};

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

export const OrderSituation = ({ order, data, situation, item, onPress }: Props) => {
    return (
        <View
            style={{
                padding: 18,
                backgroundColor: "#fff",
                borderRadius: 14,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "#E2E4E9",
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
            }}
        >

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 18,
                    alignItems: "center",
                }}
            >
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        Pedido {order}
                    </Text>
                    <Text style={{ color: "#6C7493", marginTop: 2, fontSize: 13 }}>
                        {data}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        borderRadius: 20,
                        backgroundColor: statusColors[situation],
                        paddingHorizontal: 12,
                        height: 32,
                    }}
                >
                    <Icon name={statusIcons[situation]} color="#fff" size={18} />
                    <Text style={{ fontWeight: "700", color: "#fff", fontSize: 13 }}>
                        {situation}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                }}
            >
                <View
                    style={{
                        backgroundColor: "#F3F4F6",
                        padding: 12,
                        borderRadius: 12,
                    }}
                >
                    <IconFE name="package" size={22} color="#6C7493" />
                </View>

                <View style={{ flex: 1 }}>
                    <Text
                        numberOfLines={1}
                        style={{ fontSize: 15, fontWeight: "500" }}
                    >
                        {item?.name}
                    </Text>

                    <Text
                        style={{
                            color: "#6C7493",
                            fontSize: 13,
                            marginTop: 2,
                        }}
                    >
                        Qtd: {item?.amount || 1} • R$ {item?.price}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 14,
                    borderTopColor: "#E5E7EB",
                    borderTopWidth: 1,
                }}
            >
                <View>
                    <Text style={{ color: "#6C7493", fontSize: 13 }}>
                        Total
                    </Text>
                    <Text
                        style={{
                            fontWeight: "700",
                            fontSize: 17,
                            color: "#1D77ED",
                        }}
                    >
                        R$ {item?.price}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                        paddingHorizontal: 6,
                        paddingVertical: 4,
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>Ver detalhes</Text>
                    <IconSLI name="arrow-right" color="#000" size={12} />
                </TouchableOpacity>
            </View>
        </View>
    );
};
