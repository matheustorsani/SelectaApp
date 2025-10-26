import axios from "axios";
import { API } from "../../config.json";
import { normalizeProduct } from "../utils/normalizeProducts";
import { Product } from "../types/Products";

const api = axios.create({
    baseURL: API.endpoint,
    timeout: API.timeout,
});

const responseBody = async <T = any>(route: string): Promise<T> => {
    const response = await api.get<T>(route);
    return response.data;
};

// CATEGORIAS
export const getAllCategory = async (): Promise<any[]> => {
    try {
        return await responseBody<any[]>(API.routes.getAllCategory);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    }
};

// TODOS OS PRODUTOS
export const allProducts = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(API.routes.allProducts);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    }
};

// PESQUISAR PRODUTOS
export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(
            `${API.routes.searchProducts}?name=${encodeURIComponent(query.toLowerCase())}`
        );
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    }
};

// DESTAQUES
export const highlights = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(API.routes.highlightsProducts);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos em destaque:", error);
        throw error;
    }
};

// PARA VOCÊ
export const forYou = async (id: number): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(
            `${API.routes.forYouProducts}?id=${id}`
        );
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos para você:", error);
        throw error;
    }
};

// NOTIFICAÇÕES
export const notifications = async (id: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.notifications}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as notificações:", error);
        throw error;
    }
};

export const wishList = async (id: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.wishList}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar a lista de desejos:", error);
        throw error;
    }
};

export const addWishList = async (idClient: number, idProduct: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.addWishList}?id=${idProduct}&idCliente=${idClient}`);
    } catch (error) {
        console.error("Ocorreu um erro ao adicionar o produto à lista de desejos:", error);
        throw error;
    }
};

export const getProductById = async (id: number): Promise<Product> => {
    try {
        const data = await responseBody<any>(`${API.routes.getProductById}?id=${id}`);
        return data.map(normalizeProduct)
    }
    catch (error) {
        console.error("Ocorreu um erro ao buscar o produto pelo ID:", error);
        throw error;
    }
};

// MAIS VENDIDOS
export const bestSellers = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(API.routes.bestSellers);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os mais vendidos:", error);
        throw error;
    }
};

// IMAGENS - PRINCIPAIS 
export const mainImages = async (id: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.mainImages}/${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as imagens principais:", error);
        throw error;
    }
};

// register
export const register = async (
    name: string,
    email: string,
    password: string
): Promise<any> => {
    try {
        const response = await axios.post(
            "https://selectaapi-ehg0gcd6cmapggeq.brazilsouth-01.azurewebsites.net/selectaAPI/Client/client-register",
            {
                nome: name,
                email,
                senha: password,
            },
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Ocorreu um erro ao registrar o usuário:", error);
        throw error;
    }
};

// login
export const login = async (email: string, password: string): Promise<any> => {
    try {
        const response = await axios.post(
            "https://selectaapi-ehg0gcd6cmapggeq.brazilsouth-01.azurewebsites.net/selectaAPI/Login/client-login",
            { email, senha: password },
            { headers: { accept: "*/*", "Content-Type": "application/json" } }
        );

        return response.data;
    } catch (error: any) {
        if (error.response) {
            const raw = error.response?.data ?? "Erro desconhecido";
            const message = String(raw).trim();
            const capitalizedMessage =
                message.length > 0 ? message.charAt(0).toUpperCase() + message.slice(1) : message;
            throw Error(capitalizedMessage);
        } else if (error.request) {
            throw Error("Sem resposta do servidor");
        } else {
            throw Error("Ocorreu um erro ao realizar o login:", error.message);
        }
    }
};