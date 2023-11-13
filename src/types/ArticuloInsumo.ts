import { RubroArticulo } from "./RubroArticulo";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo {
    id:number;
    denominacion:string;
    urlImagen:string;
    precioCompra:number;
    stockActual:number;
    stockMinimo:number;
    unidadMedida:UnidadMedida;
    rubroArticulo:RubroArticulo;
    fechaAlta:Date;
    fechaBaja:Date;
    fechaModificacion:Date;
}