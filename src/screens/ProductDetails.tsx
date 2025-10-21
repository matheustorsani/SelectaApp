import React from "react";
import { ScrollView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../types/RootStackParams";
import { useProductDetails } from "../hook/useProductDetails";
import { ProductPrice } from "../components/ProductDetails/ProductPrice";
import { ProductHeader } from "../components/ProductDetails/ProductHeader";
import { QuantitySelector } from "../components/ProductDetails/QuantitySelector";
import { SellerInfo } from "../components/ProductDetails/SellerInfo";
import { ProductTabs } from "../components/ProductDetails/ProductTabs";
import { ProductFAQ } from "../components/ProductDetails/ProductFAQ";
import { Styles } from "../styles/Styles";
import { LoadingSkeletonProduct } from "../components/LoadingSkeletonProduct";

type Props = NativeStackScreenProps<RootStackParams, "ProductDetails">;

export default function ProductDetails({ route }: Props) {
    const { product, loading, amount, error, toggleAmount } = useProductDetails(route.params.productId);

    if (loading) return <LoadingSkeletonProduct />;
    if (!product) return <Text>{error}</Text>;

    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }}>
            <ProductHeader product={product} />
            <ProductPrice product={product} />
            <QuantitySelector amount={amount} onToggle={toggleAmount} />
            {error && <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>}
            <SellerInfo />
            <ProductTabs product={product} />
            <ProductFAQ />
        </ScrollView>
    );
}
