import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import IconI from 'react-native-vector-icons/Ionicons';
import { Lucide } from '@react-native-vector-icons/lucide';

export default function Categories() {
    const [selectedMainCategories, setSelectedMainCategories] = useState<number[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const mainCategories = [
        { id: 1, icon: <Icon name="smartphone" size={32} />, label: "Eletrônicos e Tecnologia" },
        { id: 2, icon: <IconI name="shirt-outline" size={32} />, label: "Moda e Vestuário" },
        { id: 3, icon: <Icon name="home" size={32} />, label: "Casa e Móveis" },
        { id: 4, icon: <Lucide name="sparkles" size={32} />, label: "Informática" },
    ];

    const categories = [
        { id: 5, icon: <Lucide name="gamepad" size={16} />, label: "Jogos e Entretenimento" },
        { id: 6, icon: <Lucide name="car" size={16} />, label: "Automotivo" },
        { id: 7, icon: <Icon name="book" size={16} />, label: "Livros e Educação" },
        { id: 8, icon: <Icon name="music" size={16} />, label: "Música e Instrumentos" },
        { id: 9, icon: <Icon name="coffee" size={16} />, label: "Alimentos e Bebidas" },
        { id: 10, icon: <Icon name="activity" size={16} />, label: "Esportes e Fitness" },
        { id: 11, icon: <Icon name="camera" size={16} />, label: "Fotografia" },
        { id: 12, icon: <Icon name="gift" size={16} />, label: "Presentes e Ocasiões" },
    ];

    const toggleMainCategory = (id) => {
        setSelectedMainCategories((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((categoryId) => categoryId !== id)
                : [...prevSelected, id]
        );
    };


    const toggleCategory = (id: number) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((categoryId) => categoryId !== id)
                : [...prevSelected, id]
        );
    };
    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
            <View>
                <View style={{ flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <Text style={{ color: "#0074D9", fontSize: 23, fontFamily: "Inter", fontWeight: "bold" }}>
                        Bem-vindo à Selecta!
                    </Text>
                    <Text style={{ color: "#64748B" }}>Conte-nos um pouco sobre você</Text>
                    <Text style={{ color: "#64748B" }}>
                        Quais são seus interesses? Escolha quantos quiser!
                    </Text>
                </View>

                <View style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginTop: 25,
                    gap: 16,
                    minWidth: "100%"
                }}>
                    {Array.from({ length: Math.ceil(mainCategories.length / 2) }, (_, index) => (
                        <View key={index} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            {mainCategories.slice(index * 2, index * 2 + 2).map((category) => (
                                <CategoriesItemMain
                                    key={category.id}
                                    icon={category.icon}
                                    label={category.label}
                                    isSelected={selectedMainCategories.includes(category.id)}
                                    onPress={() => toggleMainCategory(category.id)}
                                />
                            ))}
                        </View>
                    ))}
                </View>

                <View style={{ marginTop: 10, flexDirection: "row", gap: 3, flexWrap: "wrap", width: "100%" }}>
                    {categories.map((category) => (
                        <CategoriesItem
                            key={category.id}
                            icon={category.icon}
                            label={category.label}
                            isSelected={selectedCategories.includes(category.id)}
                            onPress={() => toggleCategory(category.id)}
                        />
                    ))}
                </View>
                <View style={{ marginTop: 30, alignItems: "center",justifyContent: "flex-end", flexDirection: "row", width: "100%", gap: 20 }}>
                    <TouchableOpacity><Text style={{ color: "#64748B" }}>Pular</Text></TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: (selectedCategories.length === 0 && selectedMainCategories.length === 0) ? "#0074d9a2" : "#005FDB",
                        paddingVertical: 12,
                        paddingHorizontal: 32,
                        borderRadius: 25,
                        minWidth: 150,
                        alignItems: "center"
                    }} disabled={selectedCategories.length === 0 && selectedMainCategories.length === 0}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </GestureHandlerRootView>
    );
}

function CategoriesItemMain({ icon, label, isSelected, onPress }) {
    return (
        <TouchableOpacity
            style={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                paddingVertical: 24,
                paddingHorizontal: 16,
                borderStyle: "dashed",
                borderRadius: 10,
                padding: 24,
                minHeight: 120,
                width: "48%",
                backgroundColor: isSelected ? "#BFDBFE" : "#fff",
                gap: 10,
                borderColor: isSelected ? "#0074D9" : "#BFDBFE"
            }}
            onPress={onPress}
        >
            {icon}
            <Text style={{ textAlign: "center" }}>{label}</Text>
        </TouchableOpacity>
    );
}

function CategoriesItem({ icon, label, isSelected, onPress }) {
    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderRadius: 40,
                borderColor: isSelected ? "#0074D9" : "#d1d1d1ff",
                paddingHorizontal: 12,
                paddingVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: isSelected ? "#BFDBFE" : "#fff",
            }}
            onPress={onPress}
        >
            {icon}
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>{label}</Text>
        </TouchableOpacity>
    );
}
