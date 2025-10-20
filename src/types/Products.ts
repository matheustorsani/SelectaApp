import { ImageSourcePropType } from "react-native";

type ProductStatus = "Ativo" | "Suspenso" | "Inativo";
type ProductCondition = true | false; // true = Novo, false = Usado

export interface Product {
    id: number,
    idVendedor: number,
    name: string,
    description?: string,
    price: number,
    discount?: number,
    amount?: number,
    image: string | ImageSourcePropType,
    category: string,
    peso: number,
    status: ProductStatus
    condition: ProductCondition
    rate?: number, // Avaliação de 0 a 5
    totalRatings?: number
    specifications?: { key: string, value: string }[]
    reviews?: { id: number; userId: number; userName: string; rating: number; comment: string; date: string }[]
}
