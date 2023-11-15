import axios from 'axios';
import { Cliente } from '../types/Cliente';

const BASE_URL = 'http://localhost:8080/api/v1';

export const ClienteService = {
  getClientes: async (): Promise<Cliente[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/clientes/busquedaPorAltaC`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching clientes: ${error}`);
    }
  },

  getCliente: async (id: number): Promise<Cliente> => {
    try {
      const response = await axios.get(`${BASE_URL}/clientes/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cliente with id ${id}: ${error}`);
    }
  },

  createCliente: async (cliente: Cliente): Promise<Cliente> => {
    try {
      const response = await axios.post(`${BASE_URL}/clientes`, cliente, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating cliente: ${error}`);
    }
  },

  updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
    try {
      const response = await axios.put(`${BASE_URL}/clientes/${id}`, cliente, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cliente with id ${id}: ${error}`);
    }
  },

  deleteCliente: async (id: number, cliente: Cliente): Promise<void> => {
    try {
      const fechaBaja = new Date();
      await axios.put(`${BASE_URL}/clientes/${id}`, { ...cliente, fechaBaja }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error(`Error deleting cliente with id ${id}: ${error}`);
    }
  },
};
