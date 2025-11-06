import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../types/Products';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../hook/useUser';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp, RootStackParams } from "../types/Navigation";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProductCardProps {
  item: Product;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

/**
 * Componente visual que exibe as informações principais de um produto em formato de card.
 * Inclui imagem, nome, preço, desconto, avaliações e botão de favoritar.
 * 
 * Quando clicado, o card navega para a tela de detalhes do produto (`ProductDetails`).
 * 
 * @component
 * @param {ProductCardProps} props - Propriedades do componente.
 * @param {Product} props.item - Objeto contendo os dados do produto a serem exibidos.
 * @param {() => void} [props.onToggleFavorite] - Função opcional para alternar o estado de favorito.
 * @param {boolean} [props.isFavorite] - Indica se o produto já está marcado como favorito.
 * 
 * @returns Um card interativo com as informações do produto.
 * 
 * @example
 * ```tsx
 * <ProductCard
 *   item={{
 *     id: '123',
 *     name: 'Tênis Esportivo',
 *     price: 299.90,
 *     discount: 20,
 *     image: 'https://exemplo.com/imagem.jpg',
 *     rate: 4,
 *     totalRatings: 85
 *   }}
 * />
 * ```
 */
export function ProductCard({ item }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useUser();
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <TouchableOpacity style={{
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      elevation: 2,
    }} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {item.discount ? (
          <View style={{ backgroundColor: '#FF5252', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
              -{item.discount}%
            </Text>
          </View>
        ) : <View />}

        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={isFavorite(item.id) ? "heart" : "heart-o"}
            size={20}
            color="#FF5252"
          />
        </TouchableOpacity>
      </View>

      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={{ width: 120, height: 120, alignSelf: 'center' }}
      />
      <Text>{item.name}</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name={i < (item.rate ?? 0) ? 'star' : 'star-o'}
            size={16}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
        <Text style={{ color: 'gray', marginLeft: 6 }}>
          {item.rate ?? ''} ({item.totalRatings ?? ''})
        </Text>
      </View>

      <Text style={{ color: '#0063E6', fontWeight: 'bold', marginTop: 4 }}>
        R$ {(item.discount ? item.price - ((item.discount / 100) * item.price) : item.price).toFixed(2)}
      </Text>
      {item.discount && (
        <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 12 }}>
          R$ {item.price.toFixed(2)}
        </Text>
      )}
    </TouchableOpacity>
  );
}
