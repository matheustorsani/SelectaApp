import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StyleSheet, StatusBar, Share, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useUser } from '../hook/useUser';
import { useProductDetails } from '../hook/useProductDetails';
import IconFA from 'react-native-vector-icons/FontAwesome';

type Props = {
    navigation: any;
    productId: number;
};

export const HeaderProductsDetails = ({ navigation, productId }: Props) => {
    const { product, loading } = useProductDetails(productId);
    const { isFavorite, toggleFavorite } = useUser();

    const handleShare = async () => {
        if (!product) return;
        try {
            await Share.share({
                message: `Olha esse produto: ${product.name} - preço: R$${product.price}`,
            });
        } catch (err) {
            console.warn('Erro ao compartilhar:', err);
        }
    };

    if (loading || !product) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={{ marginRight: 16 }}
                        onPress={() => toggleFavorite(product.id)}
                    >
                        <IconFA
                            name={isFavorite(product.id) ? "heart" : "heart-o"}
                            size={23}
                            color="#FF5252"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        <Icon name="share-2" size={24} color="#333" />
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
