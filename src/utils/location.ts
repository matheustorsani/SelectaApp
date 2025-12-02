import axios from "axios";

/**
 * Realiza reverse geocoding (coordenadas -> endereço legível) utilizando a API Nominatim (OpenStreetMap).
 *
 * Constrói uma string de endereço a partir dos campos retornados pelo serviço (ex.: road, suburb, city_district, city)
 * e a retorna como uma Promise<string>. Em caso de falha na requisição ou ausência de dados relevantes, retorna
 * a string literal "Endereço desconhecido".
 *
 * @param lat - Latitude em graus decimais.
 * @param lon - Longitude em graus decimais.
 * @returns Uma Promise que resolve para a representação textual do endereço (por exemplo: "Rua X, Bairro - Distrito, Cidade")
 *          ou "Endereço desconhecido" quando o endereço não puder ser determinado.
 *
 * @remarks
 * - A função realiza uma requisição GET para https://nominatim.openstreetmap.org/reverse com retorno em JSON.
 * - Deve-se respeitar a política de uso do Nominatim (limites de taxa, inclusão de User-Agent/contato apropriado).
 * - Componentes do endereço podem estar ausentes dependendo da localização; a formatação final pode variar.
 * - Erros de rede ou respostas inesperadas são tratados internamente e resultam na string "Endereço desconhecido" em vez de lançar.
 *
 * @example
 * const endereco = await reverseGeocode(-23.55052, -46.633308);
 * // => "Av. Exemplo, Bairro Exemplo - Distrito Exemplo, Cidade Exemplo" (ou "Endereço desconhecido")
 *
 * @see https://nominatim.org/release-docs/latest/api/Reverse/
 */
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
