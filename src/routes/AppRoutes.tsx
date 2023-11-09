import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import { ABMClientes } from "../pages/ABMClientes"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/abmclientes" element={<ABMClientes/>} />
    </Routes>
  )
}

export default AppRoutes