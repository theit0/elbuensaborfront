import { useEffect, useState } from 'react'
import { ClienteService } from '../../services/ClienteService';
import { Cliente } from '../../types/Cliente';
import Loader from '../Loader/Loader';
import {  Table } from 'react-bootstrap';
import { ModalType } from '../../types/ModalType';
import ClienteModal from '../ClienteModal/ClienteModal';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import '../ClienteTable/ClienteTable.css'




const ClienteTable = () => {


    //Variable que va a contener los datos recibidos por la API
    const [clientes,setClientes] = useState<Cliente[]>([]);

    //
    const [isLoading, setIsLoading] = useState(true);

    const [refreshData,setRefreshData] = useState(false);

    useEffect(() => {

        const fetchClientes = async () =>{
                const clientes = await ClienteService.getClientes();
                setClientes(clientes);
                setIsLoading(false);
        };
        
        fetchClientes();


    },[refreshData]);


    const UsuarioInitialize = {
        id : 0,
        username : "",
        contraseña:"",
        fechaAlta : null  ,
        fechaBaja :  null ,
        fechaModificacion : null ,
    }

    //test
  // console.log(JSON.stringify(clientes,null,2));
  const initializableNewCliente = (): Cliente => {
    

    return {
        id  : 0,
        nombre : "",
        apellido : "",
        telefono : "",
        email : "",
        fechaAlta : new Date(),
        fechaBaja : null,
        fechaModificacion:null,
        usuario : UsuarioInitialize

    };
};

//const para manejar el estado del modal
const [cliente,setCliente] = useState<Cliente>(initializableNewCliente);

const[showModal,setShowModal] = useState(false);
const[modalType,setModalType] = useState<ModalType>(ModalType.NONE);
const [title, setTitle] = useState("");

//Logica del modal
const handleClick = (newTitle : string,cliente : Cliente,modal : ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setCliente(cliente);
    setShowModal(true);
}


  return(


    <section className="p-5 tabla-section">
{/*<Button onClick={() => handleClick("Nuevo cliente", initializableNewCliente(),ModalType.CREATE)}>
    Nuevo cliente
  </Button> */}

<div className="titulo-container">
        <h1 style={{fontWeight:"800"}}>Clientes</h1>
       
    </div>

{isLoading ? <Loader/> : (
    <Table hover>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>E-mail</th>
                <th>Username</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>
        </thead>

        <tbody>
            {clientes.map( cliente => (
                <tr key = {cliente.id}>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.apellido}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.usuario.username}</td> 
                    <td><EditButton onClick={() => handleClick("Editar cliente", cliente , ModalType.UPDATE)}/></td>
                    <td><DeleteButton onClick={() => handleClick("Eliminar cliente", cliente , ModalType.DELETE)}/></td>
                </tr>           
            ))}
        </tbody>
    </Table>
)}


{showModal && (
    <ClienteModal 
    show ={showModal}
    onHide = {() => setShowModal(false)}
    title = {title}
    modalType={modalType}
    cliente ={cliente}
    refreshData = {setRefreshData}
    />
)}

</section>

)
} 
export default ClienteTable;

