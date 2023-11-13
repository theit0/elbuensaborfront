import axios from 'axios';
import { UnidadMedida } from '../types/UnidadMedida';

const BASE_URL = 'http://localhost:8080/api/v1/unidades';

export const UnidadMedidaService = {
  getUnidades: async (): Promise<UnidadMedida[]> => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
