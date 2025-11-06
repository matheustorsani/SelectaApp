import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const CategoriesItem = ({ icon, label, isSelected, onPress }) => {
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
