import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

type ProfileOptionProps = {
    icon: string;
    title: string;
    subtitle: string;
    onPress?: () => any;
};

export const ProfileOption = ({ icon, title, subtitle, onPress }: ProfileOptionProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                flexDirection: "row",
                alignItems: "center"
            }}
        >
            <View
                style={{
                    borderRadius: 12,
                    backgroundColor: "#F3F4F6",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                }}
            >
                <Icon name={icon} size={20} color="#1D4ED8" />
            </View>

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 16,
                        color: "#020817",
                        fontWeight: "600",
                        marginBottom: 2,
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        color: "#64748B",
                        fontSize: 13,
                    }}
                >
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
