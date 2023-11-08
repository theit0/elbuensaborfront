import Carousel from 'react-bootstrap/Carousel';
import './CarouselHome.css'

const CarouselHome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className='w-100 dark-image'
        style={{maxHeight:"500px",objectFit:"cover"}} src='src/assets/images/fried-comfort-food-chicken.jpg'/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='w-100 dark-image'
        style={{maxHeight:"500px",objectFit:"cover"}} src='src/assets/images/pub-food-spread.jpg'/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='w-100 dark-image'
        style={{maxHeight:"500px",objectFit:"cover"}}src='src/assets/images/thai-food-takeout.jpg'/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  )
}

export default CarouselHome