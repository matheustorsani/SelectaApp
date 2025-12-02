import { useState, useEffect } from "react";
import * as Location from "expo-location";

/**
 * Hook que obtém a localização atual do usuário.
 *
 * @remarks
 * - Solicita permissão de localização em primeiro plano ao montar o componente.
 * - Se a permissão não for concedida, o hook retorna `null`.
 * - Ao obter a localização com sucesso, retorna um objeto com `latitude` e `longitude`.
 * - O hook executa a busca de localização apenas uma vez (na montagem).
 * - Depende das APIs de localização (ex.: `Location.requestForegroundPermissionsAsync`
 *   e `Location.getCurrentPositionAsync`).
 *
 * @returns {{ latitude: number; longitude: number } | null}
 * Objeto com as coordenadas do usuário ou `null` enquanto a localização não estiver disponível
 * ou se a permissão de localização for negada.
 *
 * @example
 * ```tsx
 * const location = useUserLocation();
 *
 * if (!location) return <Text>Obtendo localização...</Text>;
 * return <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>;
 * ```
 */
export const useUserLocation = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            const loc = await Location.getCurrentPositionAsync({});
            setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        })();
    }, []);

    return location;
};
