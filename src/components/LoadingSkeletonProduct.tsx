import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

export const LoadingSkeletonProduct = () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Skeleton
            width="100%"
            height="100%"
            colorMode="light"
        />
    </View>
);
