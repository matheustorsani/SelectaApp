import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Styles } from "../styles/Styles";
import Icon from "react-native-vector-icons/Feather";
import { Product, products } from "../data/Products";
import { ProductCard } from "../components/ProductCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUser } from "../context/useUser";

export default function Favorites({ navigation }: NativeStackScreenProps<any>) {
    const { user } = useUser();

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Entre ou se cadastre!</Text>
                <Text
                    style={{ color: "blue", marginTop: 10 }}
                    onPress={() => navigation.navigate("Login")}
                >
                    Ir para Login/Cadastro
                </Text>
            </View>
        );
    }

    const favoriteProducts = (user.favorites ?? [])
        .map((id) => products.find((p) => p.id === id))
        .filter((item): item is Product => !!item)

    return (
        <FlatList
            style={Styles.Main}
            showsVerticalScrollIndicator={false}
            data={favoriteProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
            renderItem={({ item }) => <ProductCard key={item.id} item={item} />}
            ListHeaderComponent={() =>
                favoriteProducts.length > 0 ? (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
                        <Icon name="heart" size={27} color="#0063E6" />
                        <Text style={Styles.TextTitle}>Meus Favoritos</Text>
                    </View>
                ) : (
                    <Text style={{ color: "#64748B", marginBottom: 16 }}>
                        Você ainda não favoritou um item.
                    </Text>
                )
            }
        />
    );
}
