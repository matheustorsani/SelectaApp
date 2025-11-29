import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Product } from '../types/Products';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavorites } from '../hook/useFavorites';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from "../types/Navigation";
import { ActivityIndicator } from 'react-native-paper';
import { useUser } from '../hook/useUser';

interface ProductCardProps {
  item: Product;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

export function ProductCard({ item }: ProductCardProps) {
  const { user } = useUser();
  const { toggleFavorite, isFavorite, loadingFavorites } = useFavorites();
  const navigation = useNavigation<RootStackNavigationProp>();

  const isLoading = loadingFavorites.includes(item.id);

  const isLogged = () => {
    if (!user) return navigation.navigate('Login');
    toggleFavorite(item.id)
  }

  return (
    <TouchableOpacity
      style={{
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
      }}
      onPress={() =>
        navigation.navigate('ProductDetails', { productId: item.id })
      }
    >
      <View style={{ position: 'relative' }}>

        {item.discount && (
          <View
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              backgroundColor: '#FF5252',
              borderRadius: 4,
              paddingHorizontal: 6,
              paddingVertical: 2,
              zIndex: 10,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>
              -{item.discount}%
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => isLogged()}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            zIndex: 10,
            padding: 4,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FF5252" />
          ) : (
            <Icon
              name={isFavorite(item.id) ? 'heart' : 'heart-o'}
              size={22}
              color="#FF5252"
            />
          )}
        </TouchableOpacity>

        {item.mainImage ? (
          <Image
            source={{ uri: item.mainImage }}
            style={{
              width: '100%',
              height: 150,
              resizeMode: 'cover',
            }}
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#c9c9c9',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Sem Imagem</Text>
          </View>
        )}
      </View>

      <Text
        numberOfLines={2}
        style={{ marginTop: 8, fontWeight: '600', paddingHorizontal: 8 }}
      >
        {item.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 4,
          paddingHorizontal: 8,
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon
            key={i}
            name={i < (item.rate ?? 0) ? 'star' : 'star-o'}
            size={15}
            color="#FFD700"
            style={{ marginRight: 2 }}
          />
        ))}
        <Text style={{ color: 'gray', marginLeft: 6 }}>
          {item.rate ?? ''} ({item.totalRatings ?? ''})
        </Text>
      </View>

      <View style={{ paddingHorizontal: 8, marginTop: 6, marginBottom: 8 }}>
        <Text
          style={{
            color: '#0063E6',
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          R${' '}
          {(
            item.discount
              ? item.price - (item.discount / 100) * item.price
              : item.price
          ).toFixed(2)}
        </Text>
        {item.discount && (
          <Text
            style={{
              textDecorationLine: 'line-through',
              color: 'gray',
              fontSize: 12,
            }}
          >
            R$ {item.price.toFixed(2)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
