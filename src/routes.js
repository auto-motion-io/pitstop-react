import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"
import Home from "./pages/home/Home"
import LoginBuscar from "./pages/loginBuscar/LoginBuscar"
import Configuracoes from "./pages/configuracoes/Configuracoes";
import ConfiguracoesMecanica from "./pages/configuracoes/ConfiguracoesMecanica";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/buscar/login" element={<LoginBuscar />} />
                        <Route path="/configuracoes/inicio" element={<Configuracoes />} />
                        <Route path="/configuracoes/mecanica" element={<ConfiguracoesMecanica />} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;