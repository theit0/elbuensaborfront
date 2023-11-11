import { useEffect, useState } from "react"
import { ArticuloInsumo } from "../../types/ArticuloInsumo"
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { UnidadMedida } from "../../types/UnidadMedida";
import { RubroArticulo } from "../../types/RubroArticulo";
import { ModalType } from "../../types/ModalType";

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

const ArticuloInsumoTabla = () => {

  //Variable que almacena todos los articulos insumo 
  const [articulosInsumo,setArticulosInsumo] = useState<ArticuloInsumo[]>([]);

  //Variable que muestra el componente loader hasta que carguen los articulos
  const [isLoading,setIsLoading] = useState(true);

  //Este hook se va a ejecutar cada vez que se renderize el componente
  useEffect(()=>{
    //Funcion para obtener todos los productos
    const fetchArticulos = async () => {
      const articulosInsumo = await ArticuloInsumoService.getArticulosInsumo();
      setArticulosInsumo(articulosInsumo);
      setIsLoading(false);
    }

    fetchArticulos();
  },[]);



  return (
    <section className="p-5">
      <Button onClick={()=>handleClick("Nuevo articulo",initializableNewArticuloInsumo(),ModalType.CREATE)}>
        Nuevo articulo
      </Button>
      {
        isLoading ? <Loader/>
        : (
          <Table hover>
              <thead>
                <th>Denominación</th>
                <th>Precio compra</th>
                <th>Stock actual</th>
                <th>Stock minimo</th>
                <th>Unidad medida</th>
                <th>Rubro articulo</th>
                <th>Imagen</th>
              </thead>
              <tbody>
                {
                  articulosInsumo.map((articulo)=>{
                    return (
                      <tr key={articulo.id}>
                          <td>{articulo.denominacion}</td>
                          <td>{articulo.precioCompra}</td>
                          <td>{articulo.stockActual}</td>
                          <td>{articulo.stockMinimo}</td>
                          <td>{articulo.unidadMedida.denominacion}</td>
                          <td>{articulo.rubroArticulo.denominacion}</td>
                          <td><img src={articulo.urlImagen} alt={articulo.denominacion} style={{width:"50px"}} /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </Table>
        )
      }
    </section>
  )
}

export default ArticuloInsumoTabla