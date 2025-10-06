import { allProducts } from "../services/apiService";
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
}

export const getProducts = async (): Promise<Product[]> => {
    try {
        const data = await allProducts();
        const products: Product[] = data.map((item: any) => ({
            id: item.idProduto,
            idVendedor: item.idVendedor,
            name: item.nome,
            amount: item.quantidade,
            price: item.precoUnitario,
            discount: item.discount,
            image: item.image,
            category: item.category,
            peso: item.peso,
            status: item.status,
            condition: item.condition,
            rate: item.rate,
            totalRatings: item.totalRatings,
            specifications: item.specifications
        }))
        
        return products;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
}
