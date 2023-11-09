import { useEffect, useState } from "react"
import { ArticuloManu } from "../../Types/ArticuloManu";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../Types/ModalTypes";
import { ArticuloManuService } from "../../services/ArticuloManuService";

import Loader from "../Loader/Loader";
import ProductModal from "../ProductModal/ProductModal";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";

const ProductTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [articles, setArticles] = useState<ArticuloManu[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchArticles = async () => {
            const articles = await ArticuloManuService.getArticles();
            setArticles(articles);
            setIsLoading(false);
        };

        fetchArticles();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    console.log(JSON.stringify(articles, null, 2));


    //Se inicializa un producto vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
        const initializeNewProduct = (): ArticuloManu => {
        return {
            id: 0,
            denominacion: "",
            precioVenta: 0,
            description: "",
            costo: 0,
            urlImagen: "",
            tiempoEstimadoCocina: 0,
            fechaAlta : new Date(2000,1,1),
            fechaBaja : new Date(2000,1,1),
            fechaModificacion:new Date(2000,1,1)
            };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
        const [article, setArticle] = useState<ArticuloManu>(initializeNewProduct);
    
    //Manejo de Modal
        const [showModal, setShowModal] = useState(false);
        const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
        const [title, setTitle] = useState("");

    //Logica de Modal
        const handleClick = (newTitle: string, art: ArticuloManu, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setArticle(art);
        setShowModal(true);
    };


  return (
    <div className="m-3">

        {/* Botón para que cuando el usuario haga click llame a la función que declaramos */}
            <Button onClick={() => handleClick("Nuevo Articulo",
                initializeNewProduct(), ModalType.CREATE)}>
                Nuevo Ariculo
            </Button>

    {isLoading ? <Loader/>: (
           
        <Table>
            <thead>
                <tr>
                    <th> DENOMINACION </th>
                    <th> PRECIO </th>
                    <th> IMAGEN </th>
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
                        <td> <EditButton onClick={() => handleClick("Editar producto", article, ModalType.UPDATE)}/> </td>
                        <td> <DeleteButton onClick={() => handleClick("Borrar producto", article, ModalType.DELETE)} /> </td>

                    </tr>
                ))}
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

    
    </div>
  )
}

export default ProductTable