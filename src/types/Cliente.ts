export interface Cliente{
   
        id : number;
        nombre : String;
        apellido : String;
        email : String;
        telefono : String;
        fechaAlta :  Date; // Tenia LocalDateTime , ver si funciona con Date...
        fechaBaja :  Date;
        fechaModificacion : Date;    
    }

