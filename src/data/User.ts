export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    phone?: string;
    address?: string;
    pedidos?: number[];
    favoritos?: number[];
    cart?: number[];
}
