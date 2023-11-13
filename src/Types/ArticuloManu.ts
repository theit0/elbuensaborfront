import { RubroArticulo } from "./RubroArticulo";

export interface ArticuloManu{
    id: number;
    denominacion : string;
    descripcion : string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    costo : number;
    urlImagen: string;
    fechaAlta : Date;
    fechaBaja: Date | null;
    fechaModificacion: Date | null;
    rubroArticulo:RubroArticulo
}