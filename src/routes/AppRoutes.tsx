import { Routes,Route } from "react-router-dom"
import Home from "../pages/Home"
import { ABMArticulosManu } from "../pages/ABMArticulosManu"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/ABM" element={<ABMArticulosManu/>}/>
    </Routes>
  )
}

export default AppRoutes