import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { Styles } from "../styles/Styles";
import { Cards } from "../components/Cards";
import { Error } from "../components/Error";
import { OptionCard } from "../components/OptionCard";
import { MyCardProduct } from "../components/MyCardProduct";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hook/useUser";
import { sales } from "../services/api/client/sales";

export const MyProducts = () => {
    const navigation = useNavigation<RootStackNavigationProp>();
    const { user } = useUser();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!user) return;

            try {
                const data = await sales(user.id as number);
                setProducts(data || []);
            } catch (error) {
                console.error("Erro ao carregar produtos do usuário:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [user]);

    if (!user)
        return Error({
            error: "Você precisa estar logado para ver seus produtos.",
            retryText: "Ir para o Login",
            onPress: () => navigation.navigate("Login")
        });

    return (
        <ScrollView
            style={Styles.Main}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flexDirection: "column" }}>
                <Cards number={products.length} text="Ativos" color="#1D77ED" />
            </View>

            <OptionCard
                bgColor="blue"
                color="white"
                icon="plus"
                text="Adicionar novo produto"
                onPress={() => navigation.navigate("AddProduct")}
            />

            <Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 20, paddingBottom: 10 }}>
                Meus produtos
            </Text>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 20 }} />
            ) : products.length === 0 ? (
                <Text style={{ marginTop: 10 }}>Você ainda não cadastrou produtos.</Text>
            ) : (
                <View>
                    {products.map((p: any) => (
                        <MyCardProduct key={p.idProduto} name={p.nome} price={p.precoUnitario} productId={p.idProduto}/>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};
