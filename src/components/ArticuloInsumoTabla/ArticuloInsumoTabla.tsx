import { useEffect, useState } from "react"
import { ArticuloInsumo } from "../../types/ArticuloInsumo"
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { UnidadMedida } from "../../types/UnidadMedida";
import { RubroArticulo } from "../../types/RubroArticulo";
import { ModalType } from "../../types/ModalType";
import ArticuloInsumoModal from "../ArticuloInsumoModal/ArticuloInsumoModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import './ArticuloInsumoTabla.css'


const ArticuloInsumoTabla = () => {
  //Inicializar un articulo por defecto y evitar el undefined
  const unidadMedidaInitialize : UnidadMedida = {
    denominacion: "",
    id: 0,
    abreviatura: "",
    fechaAlta: new Date(),
    fechaBaja: new Date(),
    fechaModificacion: new Date()
  }

  const rubroArticuloInitialize : RubroArticulo = {
    denominacion: "",
    id: 0,
    fechaAlta: new Date(),
    fechaBaja: new Date(),
    fechaModificacion: new Date()
  }

  const initializableNewArticuloInsumo = ():ArticuloInsumo=>{
    return {
      id:0,
      denominacion:"",
      urlImagen:"",
      precioCompra:0,
      stockActual:0,
      stockMinimo:0,
      unidadMedida:unidadMedidaInitialize ,
      rubroArticulo:rubroArticuloInitialize,
      fechaAlta:new Date(),
      fechaBaja:new Date(),
      fechaModificacion:new Date()
    }
  }

  //Variable para asignar el articulo a mostrar en el modal
  const [articuloInsumo,setArticuloInsumo] = useState<ArticuloInsumo>(initializableNewArticuloInsumo);

  //const para manejar el estado del modal
  const [showModal,setShowModal] = useState(false);
  const [modalType,setModalType] = useState<ModalType>(ModalType.NONE);
  const [title,setTitle] = useState("");

  const handleClick = (newTitle:string,art:ArticuloInsumo,modal:ModalType)=>{
    setTitle(newTitle);
    setModalType(modal);
    setArticuloInsumo(art);
    setShowModal(true);
  }


  //Variable que almacena todos los articulos insumo 
  const [articulosInsumo,setArticulosInsumo] = useState<ArticuloInsumo[]>([]);

  //Variable que muestra el componente loader hasta que carguen los articulos
  const [isLoading,setIsLoading] = useState(true);

  //Variable que va a actualizar los datos de la tabla luego de cada operacion exitosa
  const [refreshData,setRefreshData] = useState(false);
  
  //Este hook se va a ejecutar cada vez que se renderize el componente
  //o refresh data cambie de estado
  useEffect(()=>{
    //Funcion para obtener todos los articulos
    const fetchArticulos = async () => {
      const articulosInsumo = await ArticuloInsumoService.getArticulosInsumo();
      setArticulosInsumo(articulosInsumo);
      setIsLoading(false);
    }

    fetchArticulos();
  },[refreshData]);


  return (
    <section className="p-5 tabla-section">
      <div className="titulo-container">
        <h1 style={{fontWeight:"800"}}>Gestionar insumos</h1>
        <p>Cree, edite, modifique o elimine insumos.</p>
      </div>
      {
        isLoading ? <Loader/>
        : (
          <Table hover>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Denominación</th>
                  <th>Precio compra</th>
                  <th>Stock actual</th>
                  <th>Stock minimo</th>
                  <th>Unidad medida</th>
                  <th>Rubro articulo</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {
                  articulosInsumo.map((articulo)=>{
                    return (
                      <tr key={articulo.id} className="linea">
                          <td><img src={articulo.urlImagen} alt={articulo.denominacion} style={{width:"50px",height:"50px",objectFit:"cover"}} /></td>
                          <td>{articulo.denominacion}</td>
                          <td>{articulo.precioCompra}</td>
                          <td>{articulo.stockActual}</td>
                          <td>{articulo.stockMinimo}</td>
                          <td>{articulo.unidadMedida.denominacion}</td>
                          <td>{articulo.rubroArticulo.denominacion}</td>
                          <td><EditButton onClick={()=> handleClick("Editar producto", articulo,ModalType.UPDATE)}/></td>
                          <td><DeleteButton onClick={()=> handleClick("Borrar producto", articulo,ModalType.DELETE)}/></td>
                      </tr>
                    )
                  })
                }
                <tr className="add-row">
                  <td>
                    <button onClick={()=>handleClick("Nuevo articulo",initializableNewArticuloInsumo(),ModalType.CREATE)} className="boton-agregar">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#949494" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                    </button>
                  </td>
                  <td style={{color:"#949494"}}>Añadir insumo...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                </tr>
              </tbody>
          </Table>
        )
      }
      {
          showModal && (
              <ArticuloInsumoModal
                  show={showModal}
                  onHide={()=>setShowModal(false)}
                  title={title}
                  modalType={modalType}
                  art={articuloInsumo}
                  refreshData={setRefreshData}
              />
          )
      }
    </section>
  )
}

export default ArticuloInsumoTabla