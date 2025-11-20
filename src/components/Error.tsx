import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../styles/Styles';

interface Props {
    error: string;
    onPress?: () => void;
    retryText?: string;
}

export const Error = ({ error, onPress, retryText }: Props) => {
    return (
        <View style={[Styles.Main, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ marginBottom: 8, color: 'red', textAlign: "center" }}>{error}</Text>
            <TouchableOpacity onPress={onPress} style={{ padding: 10, backgroundColor: '#007bff', borderRadius: 8 }}>
                <Text style={{ color: '#fff' }}>{retryText}</Text>
            </TouchableOpacity>
        </View>
    );
}
