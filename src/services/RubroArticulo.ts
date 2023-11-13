import axios from 'axios';
import { RubroArticulo } from '../types/RubroArticulo';

const BASE_URL = 'http://localhost:8080/api/v1/rubros';

export const RubroArticuloService = {
  getRubros: async (): Promise<RubroArticulo[]> => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
