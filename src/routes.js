import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"
import Home from "./pages/home/Home"
import LoginBuscar from "./pages/loginBuscar/LoginBuscar"
import Configuracoes from "./pages/configuracoes/Configuracoes";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/buscar/login" element={<LoginBuscar />} />
                        <Route path="/pitstop/configuracoes" element={<Configuracoes />} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;