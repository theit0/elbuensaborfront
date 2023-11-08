import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AppRoutes from "./routes/AppRoutes"
import {BrowserRouter as Router} from "react-router-dom"
import './App.css'
import { Container } from "react-bootstrap"
function App() {
  

  return (
    <>
      <Router>
        <Header/>
          <Container style={{minHeight:"100vh",minWidth:"100%"}}>
            <AppRoutes/>
          </Container>
        <Footer/>
      </Router>
    </>
  )
}

export default App
