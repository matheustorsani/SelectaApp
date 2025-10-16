import axios from "axios";
import { API } from "../../config.json";
import { normalizeProduct } from "../utils/normalizeProducts";
import { Product } from "../data/Products";

const api = axios.create({
    baseURL: API.endpoint,
    timeout: API.timeout,
});

const responseBody = async (route: string) => {
    const response = await api.get(route);
    return response.data;
};

// CATEGORIAS
export const getAllCategory = async () => {
    try {
        return await responseBody(API.routes.getAllCategory);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    }
};

// TODOS OS PRODUTOS
export const allProducts = async (): Promise<Product[]> => {
    try {
        const data = await responseBody(API.routes.allProducts);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    }
};

// PESQUISAR PRODUTOS
export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const data = await responseBody(
            `${API.routes.searchProducts}?name=${query.toLowerCase()}`
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
        const data = await responseBody(API.routes.highlightsProducts);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos em destaque:", error);
        throw error;
    }
};

// PARA VOCÊ
export const forYou = async (id: number): Promise<Product[]> => {
    try {
        const data = await responseBody(`${API.routes.forYouProducts}?id=${id}`);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos para você:", error);
        throw error;
    }
};

// NOTIFICAÇÕES
export const notifications = async (id: number) => {
    try {
        return await responseBody(`${API.routes.notifications}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as notificações:", error);
        throw error;
    }
};

// MAIS VENDIDOS
export const bestSellers = async (): Promise<Product[]> => {
    try {
        const data = await responseBody(API.routes.bestSellers);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os mais vendidos:", error);
        throw error;
    }
};
