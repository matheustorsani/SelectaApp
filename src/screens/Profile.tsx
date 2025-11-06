import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/Styles";
import { ProfileOption } from "../components/ProfileOption";
import { ProfileBoxActivity } from "../components/ProfileBoxActivity";
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { Alert } from "react-native";
import { useUser } from "../hook/useUser";
import { RootStackNavigationProp } from "../types/Navigation";
import { useNavigation } from "@react-navigation/native";
import { resetToHome } from "../utils/resetToScreen";

export default function Profile() {
    const { user, setUser } = useUser();
    const navigation = useNavigation<RootStackNavigationProp>();

    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
                <Text>Entre ou se cadastre!</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={{ color: "blue", marginTop: 10 }}>Ir para Login/Cadastro</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const logout = () => {
        Alert.alert(
            "Confirmação",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar" },
                {
                    text: "Sair",
                    onPress: () => {
                        setUser(null);
                        resetToHome(navigation)
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={Styles.Main} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
                <Image
                    source={typeof user.avatar === "string" ? { uri: user.avatar } : user.avatar}
                    style={{
                        width: 80,
                        height: 80,
                        borderWidth: 0.5,
                        borderRadius: 40,
                        borderColor: "#000",
                        marginRight: 16,
                        resizeMode: "cover"
                    }}
                />

                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 25, flexShrink: 1, maxWidth: 200 }}>
                        {user.name}
                    </Text>
                    <Text style={{ color: "gray" }}>{user.email}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 32 }}>
                <ProfileBoxActivity title={user.orders?.length || 0} subtitle="Pedidos" />
                <ProfileBoxActivity title={user.favorites?.length || 0} subtitle="Favoritos" onPress={() => navigation.navigate("Tabs", { screen: "Favorites" })} />
                <ProfileBoxActivity title={user.cart?.length || 0} subtitle="Carrinho" onPress={() => navigation.navigate("Tabs", { screen: "Cart" })} />
            </View>

            <View style={{ flexDirection: "column", justifyContent: "center", gap: 20 }}>
                <ProfileOption
                    icon="heart"
                    title="Meus Favoritos"
                    subtitle={
                        !user.favorites || user.favorites.length === 0
                            ? "Nenhum Produto Salvo."
                            : `${user.favorites.length} produtos salvos`
                    }
                    onPress={() => navigation.navigate("Tabs", { screen: "Favorites" })}
                />
                <ProfileOption icon="shopping-bag" title="Meus Pedidos" subtitle="Ver histórico de compras" onPress={() => navigation.navigate("MyOrders")} />
                <ProfileOption icon="bell" title="Notificação" subtitle="Gerir preferências" />
                <ProfileOption icon="box" title="Meus produtos" subtitle="Gerencie seus produtos a venda" onPress={() => navigation.navigate("MyProducts")} />
                <ProfileOption icon="trending-up" title="Minhas vendas" subtitle="Histórico de vendas realizadas" />
                <ProfileOption icon="help-circle" title="Meus Tickets" subtitle="Suporte e atendimento" />
                {/* DESCULPA REACT */}
                <TouchableOpacity onPress={() => navigation.navigate("Delivery", { status: 'offline' })}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IconFA name="motorcycle" size={20} style={{ marginRight: 14, color: "#64748B" }} />
                        <View style={{ flexDirection: "column" }}>
                            <Text style={{ color: "#020817", fontSize: 16 }}>Delivery</Text>
                            <Text style={{ color: "#64748B" }}>Entregue pedidos</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <ProfileOption icon="user" title="Dados Cadastrais" subtitle="Edite suas informações" />
                <ProfileOption icon="settings" title="Configurações" subtitle="Conta e privacidade" />

                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center", width: "100%" }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            borderWidth: 1,
                            borderColor: "#ddd",
                            padding: 10,
                            borderRadius: 8,
                            width: "100%",
                            justifyContent: "center"
                        }}
                        onPress={logout}
                    >
                        <Icon name="logout" style={{ fontSize: 20 }} />
                        <Text style={{ fontSize: 15 }}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}
