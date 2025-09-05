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

export const user: User = {
    id: 1,
    name: "Matheus Torsani",
    email: "matheustorsani001@hotmail.com",
    avatar: "avatar",
    phone: "123-456-7890",
    address: "São Paulo Bahia",
    pedidos: [0],
    favoritos: [1,2],
    cart: [1, 2, 3,4,5,6,7,8,9,10]
};
