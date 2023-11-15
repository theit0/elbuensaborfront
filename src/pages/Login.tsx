import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './page_styles/Login.css'
import { Container } from 'react-bootstrap';
const Login = () => {
  return (
    <Form className='login-section'>
        <Container className=' m-0'>
            <Container className='d-flex justify-content-center'>
                <img src='src/assets/logobsnegro.svg'/>
            </Container>
            <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> <b>Usuario</b> </Form.Label>
                    <Form.Control type="email" placeholder="Usuario"  className='rounded-0'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> <b>Contraseña</b> </Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" className='rounded-0'/>
                </Form.Group>
            </Container>
            <Container>
                <Button variant="primary" type="submit">
                    Iniciar sesión
                </Button>
            </Container>
        </Container>
        
      
    </Form>
  )
}

export default Login