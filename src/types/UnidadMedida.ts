export interface UnidadMedida {
    id:number;
    denominacion:string;
    abreviatura:string;
    fechaAlta:Date;
    fechaBaja:Date | null ;
    fechaModificacion:Date | null;
}