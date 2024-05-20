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
import Estoque from "./pages/estoque/Estoque";
import EstoqueEditar from "./pages/estoque/EstoqueEditar";
import Home from "./pages/home/Home";
import OrdemServico from "./pages/ordemServico/OrdemServico";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function Rotas() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                        <Route path="/clientes" element={<PrivateRoute element={<Cliente />} />} />
                        <Route path="/clientes/editar/:idCliente" element={<PrivateRoute element={<ClienteEditar />} />} />
                        <Route path="/clientes/excluir/:idCliente" element={<PrivateRoute element={<Excluir />} />} />

                        <Route path="/servicos" element={<PrivateRoute element={<Servicos />} />} />
                        <Route path="/servicos/editar/:idServico" element={<PrivateRoute element={<ServicosEditar />} />} />
                        <Route path="/servicos/excluir/:idServico" element={<PrivateRoute element={<Excluir />} />} />

                        <Route path="/estoque" element={<PrivateRoute element={<Estoque />} />} />
                        <Route path="/estoque/editar/:idProduto" element={<PrivateRoute element={<EstoqueEditar />} />} />
                        <Route path="/estoque/excluir/:idProduto" element={<PrivateRoute element={<Excluir />} />} />

                        <Route path="/ordem-servico" element={<PrivateRoute element={<OrdemServico />} />} />

                        <Route path="/configuracoes" element={<PrivateRoute element={<Configuracoes />} />} />
                        <Route path="/configuracoes/mecanica" element={<PrivateRoute element={<ConfiguracoesMecanica />} />} />
                        <Route path="/configuracoes/galeria" element={<PrivateRoute element={<Galeria />} />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}
export default Rotas;