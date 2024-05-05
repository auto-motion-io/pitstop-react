import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPitstop from "./pages/loginPitstop/LoginPitstop"
import Configuracoes from "./pages/configuracoes/Configuracoes";
import ConfiguracoesMecanica from "./pages/configuracoes/ConfiguracoesMecanica";
import Galeria from "./pages/configuracoes/Galeria";
import Cliente from "./pages/cliente/Cliente";
import ClienteEditar from "./pages/cliente/ClienteEditar";
import Excluir from "./pages/cliente/Excluir";
import Servicos from "./pages/servicos/Servicos";
import ServicosEditar from "./pages/servicos/ServicosEditar";

function Rotas() {
    return (
        <>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />

                        <Route path="/clientes" element={<Cliente />} />
                        <Route path="/clientes/editar" element={<ClienteEditar />} />
                        <Route path="/clientes/excluir" element={<Excluir />} />

                        <Route path="/servicos" element={<Servicos />} />
                        <Route path="/servicos/editar" element={<ServicosEditar />} />
                        <Route path="/servicos/excluir" element={<Excluir />} />

                        <Route path="/configuracoes" element={<Configuracoes />} />
                        <Route path="/configuracoes/mecanica" element={<ConfiguracoesMecanica />} />
                        <Route path="/configuracoes/galeria" element={<Galeria/>} />
                    </Routes>
            </BrowserRouter>
        </>
    )
}
export default Rotas;