import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import ABMEmpleado from "../pages/ABMEmpleado"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/filtrar-empleados" element={<ABMEmpleado/>} />
    </Routes>
  )
}

export default AppRoutes