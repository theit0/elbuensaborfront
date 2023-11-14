import axios from 'axios';
import { ArticuloInsumo } from '../types/ArticuloInsumo';

const BASE_URL = 'http://localhost:8080/api/v1/ArticuloInsumo';

export const ArticuloInsumoService = {
  getArticulosInsumo: async (): Promise<ArticuloInsumo[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/busquedaPorAlta`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getArticuloInsumo: async (id: number): Promise<ArticuloInsumo> => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createArticuloInsumo: async (articuloInsumo: ArticuloInsumo): Promise<ArticuloInsumo> => {
    try {
      const response = await axios.post(BASE_URL, articuloInsumo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateArticuloInsumo: async (id: number, articuloInsumo: ArticuloInsumo): Promise<ArticuloInsumo> => {

    try {
      const response = await axios.put(`${BASE_URL}/${id}`, articuloInsumo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteArticuloInsumo: async (id: number , articuloInsumo:ArticuloInsumo): Promise<void> => {
    const fechaBaja = new Date();
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, {...articuloInsumo,fechaBaja});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
