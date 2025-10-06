import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getProducts, Product } from '../data/Products';
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";

export default function ProductDetails({ navigation }: NativeStackScreenProps<any>) {
    const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);
    const id = 1; // Temporário, depois pegar o id via props
    const product = products.find((p) => p.id === id);
    if (!product) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Produto não encontrado!</Text>
            </View>
        );
    }

    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <Image
                source={typeof product.image === "string" ? { uri: product.image } : product.image}
                style={{ width: "100%", height: 300, borderRadius: 8, marginBottom: 16, resizeMode: "cover" }}
            />

            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>{product.name}</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 25, color: "#0063E6", fontWeight: "bold" }}>
                    R$ {(product.discount ? product.price - (product.price * (product.discount / 100)) : product.price).toFixed(2)}
                </Text>
                {product.discount && (
                    <Text style={{ color: "#838383ff", fontWeight: "bold", fontSize: 25 / 2, textDecorationLine: "line-through", marginLeft: 8 }}>
                        R$ {product.price.toFixed(2)}
                    </Text>
                )}
            </View>
            {product.discount && (
                <View style={{ alignSelf: "flex-start", marginBottom: 16 }}>
                    <Text style={{ color: "green", fontSize: 12 }}>
                        Economia de R$ {(product.price * (product.discount / 100)).toFixed(2)}
                    </Text>
                </View>
            )}
            <View style={{ marginBottom: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", borderWidth: 1, borderRightWidth: 0, borderLeftWidth: 0, borderColor: "#ddd" }}>
                <Text>Quantidade:</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "#ddd", borderRadius: 4 }}
                        onPress={() => { /* Diminuir quantidade */ }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 16, fontSize: 18 }}>1</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "#ddd", borderRadius: 4 }}
                        onPress={() => { /* Aumentar quantidade */ }}
                    >
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={{ flexDirection: "row", marginBottom: 16 }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            padding: 12,
                            backgroundColor: activeTab === "description" ? "#0063E6" : "#eee",
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                        }}
                        onPress={() => setActiveTab("description")}
                    >
                        <Text style={{ color: activeTab === "description" ? "#fff" : "#333", textAlign: "center", fontWeight: "bold" }}>
                            Descrição
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            padding: 12,
                            backgroundColor: activeTab === "specifications" ? "#0063E6" : "#eee",
                            borderTopRightRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                        onPress={() => setActiveTab("specifications")}
                    >
                        <Text style={{ color: activeTab === "specifications" ? "#fff" : "#333", textAlign: "center", fontWeight: "bold" }}>
                            Especificações
                        </Text>
                    </TouchableOpacity>
                </View>
                {activeTab === "description" ? (
                    <Text style={{ fontSize: 16, color: "#333" }}>{product.description}</Text>
                ) : (
                    <View style={{ flexDirection: "column" }}>
                        {product.specifications && product.specifications.map((spec, idx) => (
                            <View key={idx} style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-between" }}>
                                <Text style={{ color: "#6C7493" }}>{spec.key}</Text>
                                <Text style={{ color: "#000", fontWeight: "600" }}>{spec.value}</Text>
                            </View>
                        ))}

                        {!product.specifications && (
                            <Text style={{ color: "#888" }}>Sem especificações disponíveis.</Text>
                        )}
                    </View>
                )}

            </View>
        </ScrollView>
    )
}