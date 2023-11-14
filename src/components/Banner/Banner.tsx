
import { Link } from 'react-router-dom'
import './Banner.css'
const Banner = () => {
  return (
        <div className='banner'>
            <div className='banner-text'>
                <h1>¡50% OFF EN ENSALADAS!</h1>
                <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 6l6 6l-6 6"></path>
                    </svg>
                    Ver más
                </Link>
            </div>
            <div>
                <img src="src/assets/images/ensalada.png" width={300}/>
            </div>
        </div>
  )
}

export default Banner