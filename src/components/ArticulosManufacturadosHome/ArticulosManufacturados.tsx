import { useEffect, useState } from "react"
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import Loader from "../Loader/Loader";
import ArticuloManuCard from "../ArticuloManuCard/ArticuloManuCard";
import './ArticulosManufacturados.css'

const ArticulosManufacturados = () => {

    //Variable que va a contener los datos recibidos por la API
    const [articles, setArticles] = useState<ArticuloManufacturado[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {

        //Llamamos a la función para obtener todos los productos declarado en el service
        const fetchArticles = async () => {
            const articles = await ArticuloManufacturadoService.getArticles();
            setArticles(articles);
            setIsLoading(false);
        };

        fetchArticles();
    }, [refreshData]);

    return (
        <section className="d-flex flex-wrap gap-4 justify-content-center p-5">
            { 
                isLoading ? <Loader/>
                :
                (
                    articles.map((articulo)=>{
                        return (
                            <ArticuloManuCard article={articulo} refreshData={setRefreshData}/>
                        )
                    })
                )
            }
        </section>
    )
}

export default ArticulosManufacturados