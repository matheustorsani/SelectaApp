import React from "react";
import { ScrollView, Text, View } from "react-native";
import { RootStackScreenProps } from "../types/Navigation";
import { useProductDetails } from "../hook/useProductDetails";
import { ProductPrice } from "../components/ProductDetails/ProductPrice";
import { ProductHeader } from "../components/ProductDetails/ProductHeader";
import { QuantitySelector } from "../components/ProductDetails/QuantitySelector";
import { SellerInfo } from "../components/ProductDetails/SellerInfo";
import { ProductTabs } from "../components/ProductDetails/ProductTabs";
import { ProductFAQ } from "../components/ProductDetails/ProductFAQ";
import { ProductOptions } from "../components/ProductDetails/ProductOptions";
import { LoadingSkeletonProduct } from "../components/LoadingSkeletonProduct";
import { useCart } from "../hook/useCart";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hook/useUser";
import { Error } from "../components/Error";

export const ProductDetails = ({ route }: RootStackScreenProps<"ProductDetails">) => {
    const productId = route.params.productId;
    const { user } = useUser();
    const navigation = useNavigation<RootStackScreenProps<"ProductDetails">["navigation"]>();
    const { product, loading, amount, error, toggleAmount } = useProductDetails(productId);
    const { add, message, errorMessage, loading: load } = useCart();

    if (loading) return <LoadingSkeletonProduct />;

    if (!product) return Error({ error: error!, retryText: "Voltar para o home", onPress: () => navigation.navigate("Tabs", { screen: "Home" }) });

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: "#fff" }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
        >
            <ProductHeader product={product} />
            <View style={{ paddingHorizontal: 16 }}>
                <ProductPrice product={product} />
                <QuantitySelector amount={amount} onToggle={toggleAmount} />
                {error && <Text style={{ color: "red" }}>{error}</Text>}
                {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
                {message && <Text style={{ color: "green" }}>{message}</Text>}
                <ProductOptions disable={load} onAdd={() => {
                    if (!user) return navigation.navigate("Login");
                    add(product.id, amount)
                }} onBuy={() => {
                    if (!user) return navigation.navigate("Login");
                    navigation.navigate("Checkout", {
                        buyNowProduct: product,
                        amount: amount
                    });
                }} />
                <SellerInfo seller={product.idVendedor} />
                <ProductTabs product={product} />
                <ProductFAQ />
            </View>
        </ScrollView>
    );
};
