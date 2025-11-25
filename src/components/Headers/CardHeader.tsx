import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
    icon?: string;
    name: string;
}

export const CardHeader = ({ icon, name }: Props) => {
    return (
        <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", marginBottom: 10, gap: 5 }}>
            {icon && <Icon name={icon} size={15} color="#000" />}

            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
        </View>
    );
}