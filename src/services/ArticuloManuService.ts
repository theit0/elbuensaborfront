import { ArticuloManu } from "../Types/ArticuloManu";

const BASE_URL = 'http://localhost:8080/api/v1';
export const ArticuloManuService = {

    
    getArticles: async (): Promise<ArticuloManu[]> => {
       
        const response = await fetch(`${BASE_URL}/ArticuloManufacturado/busquedaPorAlta`);
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
        
        article.fechaModificacion = new Date()
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

    

   
    deleteArticle: async (id: number, art:ArticuloManu): Promise<void> => {
        
        const fechaBaja= new Date();
            const response = await fetch(`${BASE_URL}/ArticuloManufacturado/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...art,fechaBaja}), // Envía la nueva fecha de baja en el cuerpo de la solicitud
            });
    
            const data = await response.json();
            return data;
        }
    
  
    };