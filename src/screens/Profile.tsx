import React from "react";
import { View, Text, Image } from "react-native";
import { user } from "../data/User";
import { Styles } from "../styles/Styles";

export default function Profile() {
    return (
        <View style={{ flex: 1, padding: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ marginRight: 16 }}>
                    <Image source={require("../../assets/smartphone.png")} style={{ width: 80, height: 80, borderRadius: 40 }} />
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
                        <View style={Styles.ProfileBoxActivity}>
                            <Text style={{ fontSize: 28, fontWeight: "bold" }}>{user.pedidos?.length}</Text>
                            <Text>Pedidos</Text>
                        </View>
                        <View style={Styles.ProfileBoxActivity}>
                            <Text style={{ fontSize: 28, fontWeight: "bold" }}>{user.favoritos?.length}</Text>
                            <Text>Favoritos</Text>
                        </View>
                        <View style={Styles.ProfileBoxActivity}>
                            <Text style={{ fontSize: 28, fontWeight: "bold" }}>{user.cart?.length}</Text>
                            <Text>No Carrinho</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}