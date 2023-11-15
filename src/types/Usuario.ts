export interface Usuario{
    id : number;
    username : String;
    contraseña:String;
    fechaAlta :  Date | null; // Tenia LocalDateTime , ver si funciona con Date...
    fechaBaja :  Date | null;
    fechaModificacion : Date | null;
}

