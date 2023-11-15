import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './page_styles/SignUp.css'
import { Container } from 'react-bootstrap';
const SignUp = () => {
  return (
    <Form className='signup-section'>
        <Container className=' m-0'>
            <Container className='d-flex justify-content-center'>
                <img src='src/assets/logobsnegro.svg' width={200}/>
            </Container>
            <Container>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> <b>Mail</b> </Form.Label>
                    <Form.Control type="email" placeholder="Mail"  className='rounded-0'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> <b>Nombre de usuario</b> </Form.Label>
                    <Form.Control type="email" placeholder="Nombre de usuario"  className='rounded-0'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> <b>Contraseña</b> </Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" className='rounded-0'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> <b>Repita la contraseña</b> </Form.Label>
                    <Form.Control type="password" placeholder="Repita la contraseña" className='rounded-0'/>
                </Form.Group>
            </Container>
            <Container>
                <Button variant="primary" type="submit">
                    Registrarse
                </Button>
            </Container>
        </Container>
    </Form>
  )
}

export default SignUp