export interface User {
    id?: number;
    name: string;
    password: string;
    email: string;
    avatar: string;
    phone?: string;
    address?: string;
    orders?: number[];
    favorites?: number[];
    cart?: number[];
    categories?: number[];
}
