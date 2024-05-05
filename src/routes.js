import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"
import LoginBuscar from "./pages/loginBuscar/LoginBuscar"
import Configuracoes from "./pages/configuracoes/Configuracoes";
import ConfiguracoesMecanica from "./pages/configuracoes/ConfiguracoesMecanica";
import Galeria from "./pages/configuracoes/Galeria";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/buscar/login" element={<LoginBuscar />} />
                        <Route path="/configuracoes" element={<Configuracoes />} />
                        <Route path="/configuracoes/mecanica" element={<ConfiguracoesMecanica />} />
                        <Route path="/configuracoes/galeria" element={<Galeria/>} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;