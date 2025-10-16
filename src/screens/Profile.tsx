import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Styles } from "../styles/Styles";
import { ProfileOption } from "../components/ProfileOption";
import { ProfileBoxActivity } from "../components/ProfileBoxActivity";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { useUser } from "../hook/useUser";

export default function Profile({ navigation }: NativeStackScreenProps<any>) {
    const { user, setUser } = useUser();

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
                        navigation.navigate("Home");
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
                <ProfileBoxActivity title={user.favorites?.length || 0} subtitle="Favoritos" />
                <ProfileBoxActivity title={user.cart?.length || 0} subtitle="Carrinho" />
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
                />
                <ProfileOption icon="shopping-bag" title="Meus Pedidos" subtitle="Ver histórico de compras" />
                <ProfileOption icon="bell" title="Notificação" subtitle="Gerir preferências" />
                <ProfileOption icon="box" title="Meus produtos" subtitle="Gerencie seus produtos a venda" />
                <ProfileOption icon="trending-up" title="Minhas vendas" subtitle="Histórico de vendas realizadas" />
                <ProfileOption icon="help-circle" title="Meus Tickets" subtitle="Suporte e atendimento" />
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
