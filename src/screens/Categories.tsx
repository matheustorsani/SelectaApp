import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { saveUser } from "../services/UserService";
import { User } from "../data/User";
import { Styles } from "../styles/Styles";
import Icon from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import { Lucide } from '@react-native-vector-icons/lucide';


export default function Categories() {
    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
            <View>
                <View style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10
                }}>
                    <Text style={{ color: "#0074D9", fontSize: 23, fontFamily: "Inter" }}>Bem vindo à Selecta!</Text>
                    <Text style={{ color: "#64748B" }}>Conte-nos um pouco sobre você</Text>
                    <Text style={{ color: "#64748B" }}>Quais são seus interesses? Escolha quantos quiser!</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginTop: 25
                }}>
                    {/* <TouchableOpacity style={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        padding: 50
                    }}>
                        <Icon name="smartphone" />
                        <Text>Eletrônicos e Tecnologia</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity>
                        <IconI name="shirt-outline" />
                        <Text>Moda e Vestuário</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="home" />
                        <Text>Casa e Móveis</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Lucide name="sparkles" />
                        <Text>Beleza e Cuidados Pessoais</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

        </GestureHandlerRootView >
    );
}