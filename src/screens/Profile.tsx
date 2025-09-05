import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { user } from "../data/User";
import { ProfileOption } from "../components/ProfileOption";
import { ProfileBoxActivity } from "../components/ProfileBoxActivity";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Profile() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: 16 }}>
                    <Image source={require("../../assets/Sample_User_Icon.png")} style={{
                        width: 80,
                        height: 80,
                        borderWidth: 0.5,
                        borderRadius: 40,
                        borderColor: "#000"
                    }} />
                </View>
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            flexShrink: 1,
                            flexWrap: "wrap",
                            maxWidth: 200
                        }}>
                        {user.name}
                    </Text>
                    <Text style={{ color: "gray" }}>{user.email}</Text>
                </View>
            </View>
            <View style={{ marginTop: 32 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <ProfileBoxActivity title={user.pedidos?.length || 0} subtitle="Pedidos" />
                        <ProfileBoxActivity title={user.favoritos?.length || 0} subtitle="Favoritos" />
                        <ProfileBoxActivity title={user.cart?.length || 0} subtitle="Carrinho" />
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "column", justifyContent: "center", gap: 20 }}>
                <TouchableOpacity>
                    <ProfileOption
                        icon="heart"
                        title="Meus Favoritos"
                        subtitle={user.favoritos?.length === 0 ? "Nenhum Produto Salvo." : `${user.favoritos?.length} produtos salvos`}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProfileOption
                        icon="shopping-bag"
                        title="Meus Pedidos"
                        subtitle="Ver histórico de compras"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProfileOption
                        icon="bell"
                        title="Notificação"
                        subtitle="Gerir preferências"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProfileOption
                        icon="settings"
                        title="Configurações"
                        subtitle="Conta e privacidade"
                    />
                </TouchableOpacity>
                <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center", overflow: "hidden", width: "100%" }}>
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
                            justifyContent: "center",
                            overflow: "hidden"
                        }}
                    >
                        <Icon name="logout" style={{ fontSize: 20 }} />
                        <Text style={{ fontSize: 15 }}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </View >
        </View >
    )
}