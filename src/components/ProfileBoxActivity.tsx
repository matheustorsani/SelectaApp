import React from "react";
import { View, Text } from "react-native";
import { Styles } from "../styles/Styles";

type ProfileBoxActivityProps = {
    title: number;
    subtitle: string;
};


export const ProfileBoxActivity = ({ title, subtitle }: ProfileBoxActivityProps) => {
    return (
        <View style={Styles.ProfileBoxActivity}>
            <Text style={{ fontSize: 28, fontWeight: "900", color: "#0063E6" }}>{title}</Text>
            <Text style={{ color: "#64748B" }}>{subtitle}</Text>
        </View>
    )
}