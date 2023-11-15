import { Cliente } from "../types/Cliente";

const BASE_URL = 'http://localhost:8080/api/v1';


export const ClienteService = {

    getClientes : async () : Promise<Cliente[]>  => {
        const response = await fetch(`${BASE_URL}/clientes/busquedaPorAltaC`);
        const data = await response.json();

        return data;
    },

    getCliente :async (id:number) : Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/clientes/$id`);
        const data = await response.json();

        return data;

        
    },

    createCliente : async (cliente:Cliente) : Promise<Cliente> => {
        const response = await fetch(`${BASE_URL}/clientes`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'  
            },
            body : JSON.stringify(cliente)
        });

        const data = await response.json();
        return data;
        
    },

    updateCliente: async (id: number,cliente: Cliente): Promise<Cliente> => {
        cliente.fechaModificacion = new Date();

          // Eliminar la propiedad 'authorities' del objeto cliente
        delete cliente.usuario.authorities;


        const response = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(cliente)
        });

        const data = await response.json();
        return data;
    },
    deleteCliente: async (id:number,cliente : Cliente): Promise<void> => {
        const fechaBaja= new Date();

          // Eliminar la propiedad 'authorities' del objeto cliente
            delete cliente.usuario.authorities;
            

        const response = await fetch(`${BASE_URL}/clientes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...cliente,fechaBaja}), // Envía la nueva fecha de baja en el cuerpo de la solicitud
        });

        const data = await response.json();
        return data;

}

}

