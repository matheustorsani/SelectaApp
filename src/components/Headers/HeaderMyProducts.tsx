import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StyleSheet, StatusBar, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../types/Navigation';

export const HeaderMyProducts = () => {
    const navigation = useNavigation<RootStackNavigationProp>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Meus Produtos</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={{ marginRight: 16 }}
                    >
                        <Icon
                            name={"bell"}
                            size={22}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 0, backgroundColor: '#fff' },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: 0
    },
    actions: { flexDirection: 'row', alignItems: 'center' },
});
