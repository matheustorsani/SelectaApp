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

export const ProductDetails = ({ route }: RootStackScreenProps<"ProductDetails">) => {
    const productId = route.params.productId;
    const navigation = useNavigation<RootStackScreenProps<"ProductDetails">["navigation"]>();
    const { product, loading, amount, error, toggleAmount } = useProductDetails(productId);
    const { add } = useCart();
    if (loading) return <LoadingSkeletonProduct />;
    if (!product) return <Text>{error}</Text>;

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
                <ProductOptions onAdd={() => { add(product.id, amount) }} onBuy={() => {
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

