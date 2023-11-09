import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CorreoView, HomeView, LoginView, PruebasView, TramiteView } from "../pages";
import { MainLayaout } from "../Layout/MainLayaout/index";
//import Datos2 from "../components/Datos2";// Asegúrate de especificar la ruta correcta al archivo de Datos2

const Router = () => {
    return(
        <BrowserRouter>           
            <Routes>
                <Route element={<MainLayaout/>}>
                    <Route path="/" element={<HomeView/>}/>
                    <Route path="tramite" element={<TramiteView/>}/>
                    <Route path="correo" element={<CorreoView/>}/>
                    <Route path="pruebas" element={<PruebasView/>}/>
                </Route>
                <Route path="login" element={<LoginView/>}/>
                

            </Routes>
            
        </BrowserRouter>
    );
}

export default Router;