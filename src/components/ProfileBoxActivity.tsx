import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Styles } from "../styles/Styles";

type ProfileBoxActivityProps = {
    title: number;
    subtitle: string;
    onPress?: () => any;
};


export const ProfileBoxActivity = ({ title, subtitle, onPress  }: ProfileBoxActivityProps) => {
    return (
        <TouchableOpacity style={Styles.ProfileBoxActivity} onPress={onPress}>
            <Text style={{ fontSize: 28, fontWeight: "900", color: "#0063E6" }}>{title}</Text>
            <Text style={{ color: "#64748B" }}>{subtitle}</Text>
        </TouchableOpacity>
    )
}