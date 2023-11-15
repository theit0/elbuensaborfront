import { Usuario } from "./Usuario";

export interface Cliente{
   
        id : number;
        nombre : String;
        apellido : String;
        email : String;
        telefono : String;
        fechaAlta :  Date | null; // Tenia LocalDateTime , ver si funciona con Date...
        fechaBaja :  Date | null;
        fechaModificacion : Date | null;   
        usuario: Usuario; 
}

