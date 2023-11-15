import { configureStore } from "@reduxjs/toolkit";
import carritoReducers from './reducers/CarritoReducers';

export const Store = configureStore({
  reducer: {
    carritoReducers, // No es necesario el nombre del reducer aquí, solo asigna la variable directamente
  },
});