import React from "react";
import { View, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

type ProfileOptionProps = {
    icon: string;
    title: string;
    subtitle: string;
};

export function ProfileOption({ icon, title, subtitle }: ProfileOptionProps) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={icon} size={20} style={{ marginRight: 14, color: "#64748B" }} />
            <View style={{ flexDirection: "column" }}>
                <Text style={{ color: "#020817", fontSize: 16 }}>{title}</Text>
                <Text style={{ color: "#64748B" }}>{subtitle}</Text>
            </View>
        </View>
    )
}
