import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { View } from 'react-native';

export const LoadingSkeleton = () => (
    <SkeletonPlaceholder>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {Array.from({ length: 6 }).map((_, i) => (
                <View key={i} style={{ width: '48%', height: 260, borderRadius: 8, marginBottom: 8 }} />
            ))}
        </View>
    </SkeletonPlaceholder>
);