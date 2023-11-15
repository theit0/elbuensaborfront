import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import ABMArticuloInsumo from "../pages/ABMArticuloInsumo"
import { ABMArticulosManu } from "../pages/ABMArticulosManu"
import DetalleArticuloManufacturado from "../pages/DetalleArticuloManufacturado"
import Carrito from "../pages/Carrito"
import { ABMClientes } from "../pages/ABMClientes"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gestionar-articulos-insumo" element={<ABMArticuloInsumo/>} />
        <Route path="/ABM-articulos-manufacturados" element={<ABMArticulosManu/>} />
        <Route path="/articulosManufacturados/:id" element={<DetalleArticuloManufacturado/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/ABM-Cliente" element={<ABMClientes/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
    </Routes>
  )
}

export default AppRoutes