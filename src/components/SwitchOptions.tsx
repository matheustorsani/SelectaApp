import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";

type Props = {
    title: string;
    subtitle: string;
    enabled?: boolean;
}

export const SwitchOptions = ({ title, subtitle, enabled = false }: Props) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        if (enabled !== undefined) setIsEnabled(enabled);
    }, []);

    const toggleSwitch = () => setIsEnabled(!isEnabled);

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#e0e0e0", paddingBottom: 8 }}>
            <View style={{ flexDirection: "column" }}>
                <Text>{title}</Text>
                <Text style={{ fontSize: 12, color: "#b8b8b8" }}>{subtitle}</Text>
            </View>
            <Switch value={isEnabled} onValueChange={toggleSwitch} color="blue" />
        </View>
    )
}