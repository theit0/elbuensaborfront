import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import ABMArticuloInsumo from "../pages/ABMArticuloInsumo"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/gestionar-articulos-insumo" element={<ABMArticuloInsumo/>} />
    </Routes>
  )
}

export default AppRoutes