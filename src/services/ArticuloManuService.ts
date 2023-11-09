import { ArticuloManu } from "../Types/ArticuloManu";

const BASE_URL = 'http://localhost:8080/api/v1';
export const ArticuloManuService = {

    
    getArticles: async (): Promise<ArticuloManu[]> => {
       
        const response = await fetch(`${BASE_URL}/ArticuloManufacturado`);
        const data = await response.json();
        return data;
    },

    
    getArticle: async (id:number): Promise<ArticuloManu> => {

        const response = await fetch (`${BASE_URL}/ArticuloManufacturado/${id}`);
        const data = await response.json();
        return data;
        
    },

    createArticle:async (article:ArticuloManu):Promise<ArticuloManu> => {

        const response = await fetch(`${BASE_URL}/ArticuloManufacturado`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });

        const data = await response.json();
        return data;
        
    },

    updateArticle: async (id: number, article: ArticuloManu): Promise<ArticuloManu> => {
        
        const response = await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(article)
        });

        const data = await response.json();
        return data;
    },

    

    deleteArticle: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
            method: "DELETE"
        });
    }
    

  
}