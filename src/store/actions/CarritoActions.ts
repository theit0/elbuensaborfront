import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";


export const getArticuloCarrito = createAction('get_articulo_carrito', () => {
    const storedCarrito = localStorage.getItem('carrito');
    const carritoActual: ArticuloManufacturado[] = storedCarrito ? JSON.parse(storedCarrito) : [];

    return {
        payload: {
        carrito: carritoActual,
        },
    } as PayloadAction<{ carrito: ArticuloManufacturado[] }>;
});

export const setArticuloCarrito = createAction('set_articulo_carrito', (articulo: ArticuloManufacturado) => {
    const storedCarrito = localStorage.getItem('carrito');
    const carritoActual: ArticuloManufacturado[] = storedCarrito ? JSON.parse(storedCarrito) : [];

    const nuevoCarrito = [...carritoActual, articulo];
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    return {
        payload: {
        articulo,
        },
    } as PayloadAction<{ articulo: ArticuloManufacturado }>;
});
  

export const eliminarArticuloUnidadCarrito = createAction('eliminar_articulo_unidad_carrito', (articuloAEliminar: ArticuloManufacturado) => {
    const storedCarrito = localStorage.getItem('carrito');
    const carritoActual: ArticuloManufacturado[] = storedCarrito ? JSON.parse(storedCarrito) : [];
    
    const indiceArticuloAEliminar = carritoActual.findIndex((articulo) => articulo.id === articuloAEliminar.id);
  
    if (indiceArticuloAEliminar !== -1) {
      carritoActual.splice(indiceArticuloAEliminar, 1);
      localStorage.setItem('carrito', JSON.stringify(carritoActual));
    }
  
    return {
      payload: {
        carrito: [...carritoActual],
        articuloAEliminar,
      },
    } as PayloadAction<{ carrito: ArticuloManufacturado[]; articuloAEliminar: ArticuloManufacturado }>;
  });
  
  export const eliminarArticuloCarrito = createAction('eliminar_articulo_carrito', (articuloId: number) => {
    const storedCarrito = localStorage.getItem('carrito');
    const carritoActual: ArticuloManufacturado[] = storedCarrito ? JSON.parse(storedCarrito) : [];
    
    const nuevoCarrito = carritoActual.filter((articulo) => articulo.id !== articuloId);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  
    return {
      payload: {
        articuloId,
      },
    } as PayloadAction<{ articuloId: number }>;
  });