export interface RubroArticulo {
    id:number;
    denominacion:string;
    fechaAlta:Date;
    fechaBaja:Date | null;
    fechaModificacion: Date | null;
}