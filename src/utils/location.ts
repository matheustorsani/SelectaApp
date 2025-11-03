import axios from "axios";

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                lat,
                lon,
                format: 'json'
            },
            headers: {
                'User-Agent': 'DeliveryApp/1.0 (zkingdragoon@gmail.com)'
            }
        });

        return `${await response.data.address.road}, ${await response.data.address.suburb} - ${await response.data.address.city_district}, ${await response.data.address.city}` || "Endereço desconhecido";
    } catch (err) {
        return "Endereço desconhecido";
    }
}


export function getDistanceKm(
    lat1: number, lon1: number,
    lat2: number, lon2: number
): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
