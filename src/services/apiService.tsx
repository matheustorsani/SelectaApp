import axios from "axios";
import { API } from '../../config.json'

const api = axios.create({
    baseURL: API.endpoint,
    timeout: API.timeout,
})

const responseBody = async (route: string) => {
    const response = await api.get(route)
    return response.data;
};

export const getAllCategory = async () => {
    try {
        return await responseBody(API.routes.getAllCategory);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
        throw error;
    };
};

export const allProducts = async () => {
    try {
        return await responseBody(API.routes.allProducts);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    };
};

export const searchProducts = async (query: string) => {
    try {
        const r = await responseBody(`${API.routes.searchProducts}?name=${query.toLowerCase()}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    };
};

export const highlights = async () => {
    try {
        return await responseBody(API.routes.highlightsProducts);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos em destaque:", error);
        throw error;
    };
};

export const forYou = async (id: number) => {
    try {
        return await responseBody(`${API.routes.forYouProducts}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos para você:", error);
        throw error;
    };
};

export const notifications = async (id: number) => {
    try {
        return await responseBody(`${API.routes.notifications}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as notificações:", error);
        throw error;
    };
};

export const bestSellers = async () => {
    try {
        return await responseBody(API.routes.bestSellers);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os mais vendidos:", error);
        throw error;
    };
};