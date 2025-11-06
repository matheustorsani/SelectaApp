import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, StyleSheet, StatusBar, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useProductDetails } from '../../hook/useProductDetails';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../types/Navigation';
import { safeGoBack } from '../../utils/safeGoBack';
import { ActivityIndicator } from 'react-native-paper';
import { useFavorites } from '../../hook/useFavorites';
import { Styles } from '../../styles/Styles';

type Props = {
    productId: number;
};

/** 
 * Componente de cabeçalho para a tela de detalhes do produto.
 * Inclui um botão de voltar, ícone de favorito e ícone de compartilhamento.
 * 
 * @param {Props} props - Id do produto, obrigatório.
 * @returns Cabeçalho para detalhes do produto.
 */

export const HeaderProductsDetails = ({ productId }: Props) => {
    const navigation = useNavigation<RootStackNavigationProp>();

    const { product, loading } = useProductDetails(productId);
    const { isFavorite, toggleFavorite, loadingFavorites } = useFavorites();

    const isLoading = loadingFavorites.includes(productId);

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
        <SafeAreaView style={Styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={Styles.container}>
                <TouchableOpacity onPress={() => safeGoBack(navigation)}>
                    <Icon name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <View style={Styles.actions}>
                    <TouchableOpacity
                        style={{ marginRight: 16 }}
                        onPress={() => toggleFavorite(product.id)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FF5252" />
                        ) : (
                            <IconFA
                                name={isFavorite(product.id) ? "heart" : "heart-o"}
                                size={23}
                                color="#FF5252"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        <Icon name="share-2" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
