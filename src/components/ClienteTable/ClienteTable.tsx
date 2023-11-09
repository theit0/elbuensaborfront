import React, { useEffect, useState } from 'react'
import { ClienteService } from '../../services/ClienteService';
import { Cliente } from '../../types/Cliente';
import Loader from '../Loader/Loader';
import { Table } from 'react-bootstrap';

const ClienteTable = () => {


    //Variable que va a contener los datos recibidos por la API
    const [clientes,setClientes] = useState<Cliente[]>([]);

    //
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchClientes = async () =>{
                const clientes = await ClienteService.getClientes();
                setClientes(clientes);
                setIsLoading(false);
        };
        
        fetchClientes();


    },[]);


    //test
    console.log(JSON.stringify(clientes,null,2));


  return (
<>

{isLoading ? <Loader/> : (

    <Table hover>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-mail</th>
                <th>Username</th>
                <th>Foto de perfil</th>
               
          
            </tr>
        </thead>
        <tbody>
            {clientes.map( cliente => (
                <tr key = {cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.usuario.asusername}</td>
                    <td><img src="src/assets/images/chad.jpg" 
                    style={{width: '50px'}}/ >  </td>
                    
                </tr>



                
            ))}
        </tbody>
    </Table>
)

}




</>
    
    
    
    
  )
}

export default ClienteTable