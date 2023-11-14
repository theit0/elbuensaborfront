import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='section-1'>
        <b>Acerca de nosotros</b>
      
        <p className="descripcion-footer"> 
          El buen sabor es una plataforma integral que conecta a restaurantes, 
          clientes y repartidores en un ecosistema de entrega de comida eficiente y conveniente.
          Esta plataforma ofrece una experiencia completa, desde realizar pedidos de comida hasta 
          administrar empleados y gestionar relaciones con los clientes.
        </p>
  
        <div className="logos">
          <a><img src="src/assets/images/brand-facebook-filled.svg"/></a>
          <a><img src="src/assets/images/brand-github-filled.svg"/></a>
          <a><img src="src/assets/images/brand-instagram.svg"/></a>
          <a><img src="src/assets/images/brand-twitter-filled.svg"/></a>
        </div>
      </div>


      <img src="src/assets/images/logobs.svg" className='logobs'/>

      <div className='section-2'>
        <section className="section-empresa">
          <b>Empresa</b>
          <a>Acerca</a>
          <a>Características</a>
          <a>Trabajos</a>
          <a>Carrera</a>
        </section>

        <section className="section-ayuda">
          <b>Ayuda</b>
          <a>Atención al cliente</a>
          <a>Detalle de entrega</a>
          <a>Términos y condiciones</a>
          <a>Política y privacidad</a>
        </section>
      </div>
    </footer>
  )
}

export default Footer