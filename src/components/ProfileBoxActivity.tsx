import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
    title: number;
    subtitle: string;
    onPress?: () => any;
};

export const ProfileBoxActivity = ({ title, subtitle, onPress }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                backgroundColor: "#fff",
                paddingVertical: 13,
                paddingHorizontal: 12,
                borderRadius: 14,
                width: 112,

                shadowColor: "#000",
                shadowOpacity: 0.06,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,

                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "800",
                    color: "#1D77ED",
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: "#64748B",
                    textAlign: "center",
                    fontWeight: "500",
                }}
            >
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
};
