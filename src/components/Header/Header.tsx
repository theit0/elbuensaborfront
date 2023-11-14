import { useState } from 'react';
import { Link } from 'react-router-dom'

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
                <Link to="/filtrar-empleados" className='navlink'><img src="src/assets/baguette.svg"/>ABM Empleados</Link>
            </div>
            
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