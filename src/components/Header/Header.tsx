import { useState } from 'react';
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './Header.css'

const Header = () => {

    
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

            <DropdownButton className="drop-button " title="ABMS">
                <Dropdown.Item className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                    <Link to="/gestionar-articulos-insumo" className='navlink'><img src="src/assets/baguette.svg"/>ABM Insumo</Link>
                </Dropdown.Item>
                <Dropdown.Item className={isMenuToggled ? 'navlinks-dropped' : 'navlinks'} >
                    <Link to="/ABM-articulos-manufacturados" className='navlink'><img src="src/assets/baguette.svg"/>ABM Articulos manufacturados</Link>
                </Dropdown.Item>
            </DropdownButton>

            
            
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