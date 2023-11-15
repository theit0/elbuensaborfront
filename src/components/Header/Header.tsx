import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Header.css'

const Header = () => {

  const navigate = useNavigate();
    const [isMenuToggled,setIsMenuToggled] = useState(false);

  return (
    <header>
         <article>
            <Link to="/">
              <img src="src/assets/logobsnegro.svg" width={100}/>
            </Link>
         </article>  
         <nav>
            <div className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                <Link to="/" className='navlink'><img src="src/assets/home.svg"/>Inicio</Link>
            </div>

            <div className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                <Link to="/carrito" className='navlink'><img src="src/assets/shopping-cart.svg"/>Carrito</Link>
            </div>

            <div className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                <Link to="/login" className='navlink'><img src="src/assets/login-2.svg"/>Login</Link>
            </div>

            <div className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                <Link to="/signup" className='navlink'><img src="src/assets/login-2.svg"/>Sign up</Link>
            </div>

            <button onClick={()=>navigate('/gestionar-articulos-insumo')} className='navlink'><img src="src/assets/baguette.svg"/>ABM Insumo</button>

            <button onClick={()=>navigate('/ABM-articulos-manufacturados')}  className='navlink'><img src="src/assets/baguette.svg"/>ABM Articulos manufacturados</button>

            <button onClick={()=>navigate('/ABM-Cliente')}  className='navlink'><img src="src/assets/baguette.svg"/>ABM Cliente</button>

           
            
            <button className='dropdown-button' onClick={() => setIsMenuToggled(!isMenuToggled)}>
                {
                  isMenuToggled &&
                  <img src='src/assets/menuicon.svg'/>
                }
                {
                  !isMenuToggled &&
                  <img src='src/assets/x.svg'/>
                }
            </button>

         </nav>   
    </header>
  )
}

export default Header