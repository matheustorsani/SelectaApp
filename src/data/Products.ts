type ProductCategory = 'Eletrônicos' | 'Moda' | 'Casa e Banho' | 'Esportes' | 'Livros' | 'Beleza';
type ProductStatus = "Indisponível" | "Disponível" | "Esgotado";
type ProductCondition = 0 | 1; // 0: Novo, 1: Usado

export interface Product {
    id: number,
    idVendedor: number,
    name: string,
    description: string,
    price: number,
    discount?: number,
    image: string,
    category: ProductCategory,
    peso: number,
    status: ProductStatus
    condition: ProductCondition
    rate: number, // Avaliação de 0 a 5
    totalRatings?: number
}

export const products: Product[] = [
    {
        id: 1,
        idVendedor: 1,
        name: 'Smartphone Premium 128GB',
        description: 'Smartphone',
        price: 1199.99,
        discount: 25,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos',
        peso: 0.5,
        status: "Disponível",
        condition: 0,
        rate: 4,
        totalRatings: 234
    },
    {
        id: 2,
        idVendedor: 1,
        name: 'Smartphone Premium 128GB',
        description: 'Smartphone',
        price: 1199.99,
        discount: 9,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos',
        peso: 0.5,
        status: "Disponível",
        condition: 0,
        rate: 3,
        totalRatings: 234
    },
]