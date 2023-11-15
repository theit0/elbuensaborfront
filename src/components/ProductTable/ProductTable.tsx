import { useEffect, useState } from "react"
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ModalType } from "../../types/ModalType";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";

import Loader from "../Loader/Loader";
import ProductModal from "../ProductModal/ProductModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import { RubroArticulo } from "../../types/RubroArticulo";
import { Table } from "react-bootstrap";
import './ProductTable.css'


const ProductTable = () => {
    const rubroArticuloInitialize : RubroArticulo = {
        denominacion: "",
        id: 0,
        fechaAlta: new Date(),
        fechaBaja: new Date(),
        fechaModificacion: new Date()
    }

    //Variable que va a contener los datos recibidos por la API
    const [articles, setArticles] = useState<ArticuloManufacturado[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchArticles = async () => {
            const articles = await ArticuloManufacturadoService.getArticles();
            setArticles(articles);
            setIsLoading(false);
        };

        fetchArticles();
    }, [refreshData]);

   

    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
    const initializeNewProduct = (): ArticuloManufacturado => {
        return {
            id: 0,
            denominacion: "",
            precioVenta: 0,
            descripcion: "",
            costo: 0,
            urlImagen: "",
            tiempoEstimadoCocina: 0,
            fechaAlta : new Date(),
            fechaBaja : null,
            fechaModificacion:null,
            rubroArticulo:rubroArticuloInitialize
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [article, setArticle] = useState<ArticuloManufacturado>(initializeNewProduct);
    
    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, art: ArticuloManufacturado, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticle(art);
        setShowModal(true);
    };

    console.log(articles)

  return (
    <section className="p-5 tabla-section">

    <div className="titulo-container">
        <h1 style={{fontWeight:"800"}}>Articulos Manufacturados</h1>
       
    </div>
           

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th> DENOMINACION </th>
                    <th> PRECIO </th>
                    <th> IMAGEN </th>
                    <th>RUBRO ARTICULO</th>
                    <th> EDITAR</th>
                    <th> BORRAR </th>
                </tr>
            </thead>
            <tbody>
                {articles.map(article => (
                    <tr key={article.id}>
                        <td> {article.denominacion} </td>
                        <td> {article.precioVenta} </td>
                        <td> <img src={article.urlImagen} alt={article.denominacion} style={{width: '50px'}} /> </td>
                        <td>{article.rubroArticulo?.denominacion}</td>
                        <td> <EditButton onClick={() => handleClick("Editar producto", article, ModalType.UPDATE)}/> </td>
                        <td> <DeleteButton onClick={() => handleClick("Borrar producto", article, ModalType.DELETE)} /> </td>
                    </tr>
                ))}
                 <tr className="add-row">
                  <td>
                    <button onClick={()=>handleClick("Nuevo articulo",initializeNewProduct(),ModalType.CREATE)} className="boton-agregar">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#949494" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                      </svg>
                    </button>
                  </td>
                  <td style={{color:"#949494"}}>Añadir Articulo...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  <td style={{color:"#949494"}}>...</td>
                  
                </tr>
            </tbody>

        </Table>

    )}

    {showModal && (
        <ProductModal 
        show = {showModal}
        onHide={() => setShowModal(false)}
        title={title}
        modalType={modalType}
        artl={article}
        refreshData={setRefreshData}
        />
        
        
        
        
    )}

    
    </section>
  )
}

export default ProductTable
