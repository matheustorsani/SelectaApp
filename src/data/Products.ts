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
    },
    {
        id: '2',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '3',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '4',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '5',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '6',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '7',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '8',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '9',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
    {
        id: '10',
        name: 'Smartphone',
        description: 'Smartphone',
        price: 999.99,
        image: require("../../assets/smartphone.png"),
        category: 'Eletrônicos'
    },
]