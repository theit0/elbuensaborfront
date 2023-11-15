import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RubroArticulo } from "../types/RubroArticulo";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { ArticuloManufacturadoService } from "../services/ArticuloManufacturadoService";
import './page_styles/DetalleArticuloManufacturado.css'
import { useDispatch } from "react-redux";
import { setArticuloCarrito } from "../store/actions/CarritoActions";

const DetalleArticuloManufacturado = () => {
  
    const rubroArticuloInitialize : RubroArticulo = {
        denominacion: "",
        id: 0,
        fechaAlta: new Date(),
        fechaBaja: new Date(),
        fechaModificacion: new Date()
    }

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

    const [articulo,setArticulo] = useState<ArticuloManufacturado>(initializeNewProduct);

    const { id } = useParams();
    const articleId = Number(id);
    const [seClickeo,setSeClickeo] = useState('añadir-carrito-boton')
    const [seClickeoBool,setseClickeoBool] = useState(false)
    const [mensajeUnidades, setMensajeUnidades] = useState(false)
  
    useEffect(() => {
        window.scrollTo(130, 130);
        const fetchArticle = async () => {
            const article = await ArticuloManufacturadoService.getArticle(articleId);
            setArticulo(article);
        };
        fetchArticle();
    }, []);

    const [unidades,setUnidades] = useState(0)
  
    if(unidades<0) {
      setUnidades(0);
    }


    const agregarAlCarrito = () => {
        let i=0;
        for(i=0; i < unidades; i++) {
            setArticuloCarrito(articulo)
        }
        if(unidades>0){
          setSeClickeo("boton-agregado-carrito-detalle")
          setseClickeoBool(true)
          setTimeout(() => {
              setSeClickeo("añadir-carrito-boton")
              setseClickeoBool(false)
          }, 500);
        } 
      }

    return (
    <section className='art-manuf-detalle-section'>
          {
            articulo ?
            <div className='art-manuf-detalle-container'> 
                <Link to='/' className='ir-atras'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-left" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M5 12l4 4"></path>
                    <path d="M5 12l4 -4"></path>
                  </svg>
                    Ir atrás
                </Link>
                <div>
                    <span className='path'>{`Inicio / ${articulo.rubroArticulo ? articulo.rubroArticulo.denominacion : 'Rubro Desconocido'} / `}</span>
                    <span><b>{`${articulo.denominacion}`}</b></span>
                </div>

                <div className='articulo-detalle-container'>
                    <div className='detalle-articulo-imagen-container'>
                        <img src={articulo.urlImagen} alt={articulo.denominacion} />
                    </div>
                    <div className='detalle-articulo-info'>
                        <div className='articulo-info-subdiv'>
                          <h1>{articulo.denominacion}</h1>
                          <p>{articulo.descripcion}</p>
                        </div>
                        <div className='articulo-info-subdiv'>
                          <h3>${articulo.precioVenta} por unidad</h3>
                          <p>10% OFF con retiro en el local</p>
                        </div>
                        <div className='cantidad-unidades-container'>
                          <div className='cantidad-unidades'>
                            <button onClick={()=>setUnidades(unidades-1)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-minus" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 12l14 0"></path>
                              </svg>
                            </button>
                            <span>
                                {unidades}
                            </span>
                            <button onClick={()=>setUnidades(unidades+1)}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                              </svg>
                            </button>
                          </div>
                          <p>¡Quedan <b className='unidades'>10 unidades</b> disponibles!</p>
                        </div>
                        <button className={seClickeo}  onClick={()=>agregarAlCarrito()} >
                          {
                            !seClickeoBool ?
                            <div className='añadir-carrito-boton-subdiv'>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                  <path d="M12.5 17h-6.5v-14h-2"></path>
                                  <path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5"></path>
                                  <path d="M16 19h6"></path>
                                  <path d="M19 16v6"></path>
                              </svg>
                              Añadir al carrito
                            </div>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                          }
                        </button>
                    </div>
                </div>
            </div>
            :
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          }
          
      </section>
  )
}

export default DetalleArticuloManufacturado