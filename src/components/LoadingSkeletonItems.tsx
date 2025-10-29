import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

/**
 * @returns Componente de Carregamento do esqueleto dos Itens, usado em src/screens/Home.
 */
export const LoadingSkeletonItems = () => (
  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    {Array.from({ length: 6 }).map((_, i) => (
      <View key={i} style={{ width: '48%', marginBottom: 16 }}>
        <Skeleton
          width="100%"
          height={250}
          radius={8}
          colorMode="light"
        />
      </View>
    ))}
  </View>
);
