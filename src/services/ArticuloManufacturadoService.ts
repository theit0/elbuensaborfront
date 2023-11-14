import axios from "axios";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

const BASE_URL = 'http://localhost:8080/api/v1';

export const ArticuloManufacturadoService = {
    
    getArticles: async (): Promise<ArticuloManufacturado[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/ArticuloManufacturado/busquedaPorAlta`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching articles: " + error);
        }
    },
    
    getArticle: async (id: number): Promise<ArticuloManufacturado> => {
        try {
            const response = await axios.get(`${BASE_URL}/ArticuloManufacturado/${id}`);
            return response.data;
        } catch (error) {
            throw new Error("Error fetching article: " + error);
        }
    },

    createArticle: async (article: ArticuloManufacturado): Promise<ArticuloManufacturado> => {
        try {
            const response = await axios.post(`${BASE_URL}/ArticuloManufacturado`, article, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error creating article: " + error);
        }
    },

    updateArticle: async (id: number, article: ArticuloManufacturado): Promise<ArticuloManufacturado> => {
        try {
            article.fechaModificacion = new Date();
            const response = await axios.put(`${BASE_URL}/ArticuloManufacturado/${id}`, article, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error updating article: " + error);
        }
    },

    deleteArticle: async (id: number, art: ArticuloManufacturado): Promise<void> => {
        try {
            const fechaBaja = new Date();
            const response = await axios.put(`${BASE_URL}/ArticuloManufacturado/${id}`, { ...art, fechaBaja }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error("Error deleting article: " + error);
        }
    },
};
