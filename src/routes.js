import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"
import Configuracoes from "./pages/configuracoes/Configuracoes";
import ConfiguracoesMecanica from "./pages/configuracoes/ConfiguracoesMecanica";
import Galeria from "./pages/configuracoes/Galeria";
import Cliente from "./pages/cliente/Cliente";
import ClienteEditar from "./pages/cliente/ClienteEditar";
import Excluir from "./pages/cliente/Excluir";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/cliente" element={<Cliente />} />
                        <Route path="/cliente/editar" element={<ClienteEditar />} />
                        <Route path="/cliente/excluir" element={<Excluir />} />
                        <Route path="/configuracoes" element={<Configuracoes />} />
                        <Route path="/configuracoes/mecanica" element={<ConfiguracoesMecanica />} />
                        <Route path="/configuracoes/galeria" element={<Galeria/>} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;