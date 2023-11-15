
import './ArticuloCarrito.css'
import { eliminarArticuloCarrito, eliminarArticuloUnidadCarrito, setArticuloCarrito } from "../../store/actions/CarritoActions";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

type ArticuloCarritoProps = {
    articulo: ArticuloManufacturado; // Reemplaza 'any' con el tipo de tu objeto de artículo
    cntAgr: number;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticuloCarrito = ({ articulo, cntAgr,refreshData }:ArticuloCarritoProps) => {

    
    const disminuirCantidad = (art: ArticuloManufacturado) => {
        eliminarArticuloUnidadCarrito(art)
        refreshData(prevState => !prevState);
    }

    const aumentarCantidad = (art: ArticuloManufacturado) => {
        setArticuloCarrito(art)
        refreshData(prevState => !prevState);
    }

    const eliminarDelCarrito = (id: number) => {
        eliminarArticuloCarrito(id)
        refreshData(prevState => !prevState);
    }

    return (
        <article className="articulo-carrito">
            <div className="articulo-carrito-info">
                <div className="articulo-imagen-container-carrito">
                    <img src={articulo.urlImagen}/>
                </div>
                <div className="info-carrito-texto">
                    <h3>{articulo.denominacion.toUpperCase()}</h3>
                    <p>{articulo.descripcion}</p>
                </div>
            </div>
            <div className="articulo-precio-container">
                
                <div className="cantidad-unidades-carrito">
                    <button onClick={()=>disminuirCantidad(articulo)}>-</button>
                    <span>{cntAgr}</span>
                    <button onClick={()=>aumentarCantidad(articulo)}>+</button>
                </div>
                <span>${articulo.precioVenta*cntAgr}</span>
                <button onClick={()=>eliminarDelCarrito(articulo.id)} className="eliminar-articulo-boton">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 7l16 0"></path>
                        <path d="M10 11l0 6"></path>
                        <path d="M14 11l0 6"></path>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                    </svg>
                </button>
            </div>
        </article>
    );
};

export default ArticuloCarrito;
