type ProductCategory = 'Eletrônicos' | 'Moda' | 'Casa e Banho' | 'Esportes' | 'Livros' | 'Beleza';

export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    image: string,
    category: ProductCategory,
}


export const products: Product[] = [
    {
        id: '1',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    }
]