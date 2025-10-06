import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ELE PRECISA DE UM ID PARA SABER QUAL PRODUTO É,
// PARA PODER FAVORITAR E COMPARTILHAR

// MAS POR ENQUANTO VAI FICAR ASSIM

export default function HeaderProductsDetails({ navigation }: NativeStackScreenProps<any>) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, paddingBottom: 0 }}>
                <TouchableOpacity onPress={() => {
                    if (typeof navigation !== 'undefined') {
                        navigation.goBack();
                    }
                }}>
                    <Text>
                        <Icon name="arrow-left" size={24} color="#333" />
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 16 }}>
                        <Text>
                            <Icon name="heart" size={24} color="#333" />
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {/* // NÃO FAÇO IDEIA DE COMO VOU FAZER ISSO AQUI */}
                        <Text>
                            <Icon name="share-2" size={24} color="#333" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    logo: {
        width: 120,
        height: 40,
    },
    categoriesContainer: {
        paddingHorizontal: 8,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 8,
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
    },
});
