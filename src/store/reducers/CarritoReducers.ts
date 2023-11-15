import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { eliminarArticuloCarrito, eliminarArticuloUnidadCarrito, getArticuloCarrito, setArticuloCarrito } from "../actions/CarritoActions";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

interface EstadoCarrito {
  carrito: ArticuloManufacturado[]; // Define el tipo exacto de tu carrito de compras
  // Por ejemplo: carrito: Articulo[]
}

const estadoInicial: EstadoCarrito = {
  carrito: [],
};

const CarritoReducers = createReducer(estadoInicial, (builder) => {
  builder
    .addCase(getArticuloCarrito, (state, action: PayloadAction<{ carrito: ArticuloManufacturado[] }>) => {
      return {
        ...state,
        carrito: action.payload.carrito,
      };
    })
    .addCase(setArticuloCarrito, (state, action: PayloadAction<{ articulo: ArticuloManufacturado }>) => {
      const nuevoArticulo = action.payload.articulo;
      return {
        ...state,
        carrito: [...state.carrito, nuevoArticulo],
      };
    })
    .addCase(eliminarArticuloCarrito, (state, action: PayloadAction<{ articuloId: number }>) => {
      const articuloId = action.payload.articuloId;
      // Lógica para eliminar el artículo del carrito
      return {
        ...state,
        carrito: state.carrito.filter((articulo) => articulo.id !== articuloId),
      };
    })
    .addCase(eliminarArticuloUnidadCarrito, (state, action: PayloadAction<{ carrito: ArticuloManufacturado[] }>) => {
      return {
        ...state,
        carrito: action.payload.carrito,
      };
    });
});

export default CarritoReducers;
