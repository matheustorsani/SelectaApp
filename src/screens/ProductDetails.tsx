import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";
import { RootStackParams } from "../data/RootStackParams";
import { useProducts } from "../hook/useProducts";
import { Product } from "../data/Products";
import { LoadingSkeletonProduct } from "../components/LoadingSkeletonProduct";

type ProductProp = NativeStackScreenProps<RootStackParams, 'ProductDetails'>;

export default function ProductDetails({ route }: ProductProp) {
    const [activeTab, setActiveTab] = useState<"description" | "specifications">("description");
    const [amount, setAmount] = useState(1);
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    // logica meia estranha para resetar a quantidade quando mudar de produto, mas funciona
    const [prevProductId, setPrevProductId] = useState<number | null>(null);

    const { productId } = route.params;
    const { products, loadProducts, loading } = useProducts();

    const toggleAmount = (increment: boolean) => {
        if (!product) return;

        setAmount(prev => {
            let next = increment ? prev + 1 : prev - 1;

            if (next < 1) next = 1;
            if (next > product.amount!) {
                setError("Quantidade máxima atingida");
                setTimeout(() => setError(null), 2000);
                next = product.amount!;
            }

            return next;
        });
    };


    useEffect(() => {
        if (products.length === 0) {
            loadProducts();
            return;
        }

        const p = products.find(p => p.id === productId);
        setProduct(p);

        if (productId !== prevProductId) {
            setAmount(1);
            setPrevProductId(productId);
        }
    }, [products, productId]);


    if (!product) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {loading ? <LoadingSkeletonProduct /> : <Text>Produto não encontrado!</Text>}
            </View>
        );
    }

    const finalPrice = product.discount
        ? product.price - (product.price * (product.discount / 100))
        : product.price;

    return (
        <ScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <Image
                source={typeof product.image === "string" ? { uri: product.image } : product.image}
                style={{ width: "100%", height: 300, borderRadius: 8, marginBottom: 16, resizeMode: "cover" }}
            />

            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>{product.name}</Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 25, color: "#0063E6", fontWeight: "bold" }}>
                    R$ {finalPrice.toFixed(2)}
                </Text>
                {product.discount && (
                    <Text style={{ color: "#838383ff", fontWeight: "bold", fontSize: 25 / 2, textDecorationLine: "line-through", marginLeft: 8 }}>
                        R$ {product.price.toFixed(2)}
                    </Text>
                )}
            </View>

            {product.discount && (
                <View style={{ alignSelf: "flex-start" }}>
                    <Text style={{ color: "green", fontSize: 12 }}>
                        Economia de R$ {(product.price * (product.discount / 100)).toFixed(2)}
                    </Text>
                </View>
            )}

            {/* Quantidade */}
            <View style={{
                marginTop: 17,
                marginBottom: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                borderWidth: 1,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                borderColor: "#ddd"
            }}>
                <Text>Quantidade:</Text>
                <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "#ddd", borderRadius: 4 }}
                        onPress={() => toggleAmount(false)}
                    >
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: 16, fontSize: 18 }}>{amount}</Text>
                    <TouchableOpacity
                        style={{ paddingHorizontal: 13, paddingVertical: 10, backgroundColor: "#ddd", borderRadius: 4 }}
                        onPress={() => toggleAmount(true)}
                    >
                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

            {/* Tabs */}
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
                    <Text style={{ color: "#888" }}>{product.description || "Sem descrição disponível."}</Text>
                ) : (
                    <View style={{ flexDirection: "column" }}>
                        {product.specifications && product.specifications.length > 0 ? (
                            product.specifications.map((spec, idx) => (
                                <View key={idx} style={{ flexDirection: "row", marginBottom: 8, justifyContent: "space-between" }}>
                                    <Text style={{ color: "#6C7493" }}>{spec.key}</Text>
                                    <Text style={{ color: "#000", fontWeight: "600" }}>{spec.value}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={{ color: "#888" }}>Sem especificações disponíveis.</Text>
                        )}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
