import React, { useRef, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { get_articulos_denominacion } from '../../store/actions/ArticuloActions';

const InputBuscar: React.FC = () => {
    const dispatch = useDispatch();
    const inputSearch = useRef<HTMLInputElement>(null);

    const manejarBusquedaPorDenominacion = () => {
        if (inputSearch.current) {
            dispatch(get_articulos_denominacion({
                denominacion: inputSearch.current.value,
            }));
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Aquí puedes manejar los cambios en el input si es necesario
        // Por ejemplo: console.log(e.target.value);
    };

    return (
        <div className='search-container'>
            <input
                type="text"
                placeholder='Buscar comida'
                ref={inputSearch}
                onChange={handleChange}
            />
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-search"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#929191"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </button>
        </div>
    );
};

export default InputBuscar;
