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
import RecuperarSenhaPitstop from "./pages/recuperarSenhaPitstop/RecuperarSenhaPitstop";
import EsqueciSenha from "./pages/loginPitstop/EsqueciSenha";
import Financeiro from "./pages/financeiro/Financeiro"

function Rotas() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPitstop />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/clientes" element={<Cliente />} />
                        <Route path="/clientes/editar" element={<ClienteEditar />} />
                        <Route path="/clientes/excluir" element={<Excluir />} />

                        <Route path="/servicos" element={<PrivateRoute element={<Servicos />} />} />
                        <Route path="/servicos/editar/:id" element={<PrivateRoute element={<ServicosEditar />} />} />
                        <Route path="/servicos/excluir/:id" element={<PrivateRoute element={<Excluir />} />} />

                        <Route path="/estoque" element={<Estoque />} />
                        <Route path="/estoque/editar" element={<EstoqueEditar />} />
                        <Route path="/estoque/excluir" element={<Excluir />} />

                        <Route path="/ordem-servico" element={<PrivateRoute element={<OrdemServico />} />} />

                        <Route path="/configuracoes" element={<PrivateRoute element={<Configuracoes />} />} />
                        <Route path="/configuracoes/mecanica" element={<PrivateRoute element={<ConfiguracoesMecanica />} />} />
                        <Route path="/configuracoes/galeria" element={<PrivateRoute element={<Galeria />} />} />

                        <Route path="/recuperar-senha" element={<PrivateRoute element={<RecuperarSenhaPitstop />} />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}
export default Rotas;