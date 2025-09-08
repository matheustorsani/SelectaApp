export interface User {
    id: number;
    name: string;
    password: string;
    email: string;
    avatar: string;
    phone?: string;
    address?: string;
    pedidos?: number[];
    favoritos?: number[];
    cart?: number[];
    categories?: string[]
}
