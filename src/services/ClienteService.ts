import axios from 'axios';
import { Cliente } from "../types/Cliente";

const BASE_URL = 'http://localhost:8080/api/v1';

export const ClienteService = {
    getClientes: async (): Promise<Cliente[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/clientes/busquedaPorAltaC`);
            return response.data;
        } catch (error) {
            // Manejar errores aquí si es necesario
            throw new Error("Error deleting article: " + error);
        }
    },

    getCliente: async (id: number): Promise<Cliente> => {
        try {
            const response = await axios.get(`${BASE_URL}/clientes/${id}`);
            return response.data;
        } catch (error) {
            // Manejar errores aquí si es necesario
            throw new Error("Error deleting article: " + error);
        }
    },

    createCliente: async (cliente: Cliente): Promise<Cliente> => {
        try {
            const response = await axios.post(`${BASE_URL}/clientes`, cliente, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Manejar errores aquí si es necesario
            throw new Error("Error deleting article: " + error);
        }
    },

    updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {

        cliente.fechaModificacion = new Date();

          // Eliminar la propiedad 'authorities' del objeto cliente
        delete cliente.usuario.authorities;

        try {
            const response = await axios.put(`${BASE_URL}/clientes/${id}`, cliente, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Manejar errores aquí si es necesario
            throw new Error("Error deleting article: " + error);
        }
    },

    deleteCliente: async (id: number, cliente: Cliente): Promise<void> => {

          // Eliminar la propiedad 'authorities' del objeto cliente
            delete cliente.usuario.authorities;
            
        try {
            const fechaBaja = new Date();
            const response = await axios.put(`${BASE_URL}/clientes/${id}`, {...cliente, fechaBaja}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            // Manejar errores aquí si es necesario
            throw new Error("Error deleting article: " + error);
        }
    }
};
