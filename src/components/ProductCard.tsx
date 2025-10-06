import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Product } from '../data/Products';
import { useUser } from '../context/useUser'; 

interface ProductCardProps {
  item: Product;
}

export const ProductCard = memo(({ item }: ProductCardProps) => {
  const { toggleFavorite, isFavorite } = useUser();

  return (
    <TouchableOpacity style={{
      width: '48%',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
      elevation: 2,
    }}>
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
});
