import React, { useEffect, useState } from 'react';
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import style from "./Home.module.css";
import Botao from "../../components/botao/Botao";
import Add from "../../utils/assets/botao-add-laranja.svg";
import Tarefa from "../../components/tarefa/Tarefa";
import GraficoOrdensPendentes from '../../components/graficoOrdensPendentes/GraficoOrdensPendentes';
import GraficoClientesAtivos from '../../components/graficoClientesAtivos/GraficoClientesAtivos';
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

const Home = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/adicionar-tarefa`);
  };

  const [estoqueBaixo, setEstoqueBaixo] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [tarefasHoje, setTarefasHoje] = useState([]);
  const [filtroHoje, setFiltroHoje] = useState(false);

  const idOficina = sessionStorage.getItem("idOficina");

  useEffect(() => {
    const fetchEstoqueBaixo = async () => {
      try {
        const response = await api.get(`/produtoEstoque/estoque-baixo/${idOficina}`);
        setEstoqueBaixo(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos com baixo estoque:", error);
      }
    };

    fetchEstoqueBaixo();
  }, [idOficina]);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get(`/tarefas/${idOficina}`);
        setTarefas(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTarefas();
  }, [idOficina]);

  const handleFiltrarHoje = async () => {
    try {
      const response = await api.get(`/tarefas/deadline-hoje/${idOficina}`);
      setTarefasHoje(response.data);
      setFiltroHoje(true);
    } catch (error) {
      console.error("Erro ao buscar tarefas de hoje:", error);
    }
  };

  const handleMostrarTodas = () => {
    setFiltroHoje(false);
  };

  return (
    <div>
      <div>
        <NavBar currentPage={"home"} />
      </div>

      <Alignner>
        <div className={style["box"]}>
          <h1>Painel Geral</h1>
          <div className={style["container"]}>
            <div className={style["container_grafico"]}>
              <div style={{ color: "#474747" }}>
                <h2 style={{ fontSize: "25px" }}>Ordens de Serviço</h2>
                <h3
                  style={{
                    fontFamily: "Product-Sans",
                    fontWeight: "normal",
                    fontSize: "15px",
                  }}
                >
                  Pendentes
                </h3>

                <GraficoOrdensPendentes idOficina={idOficina} />
              </div>
            </div>

            <div className={style["container_kpi"]}>
              <div className={style["kp1"]}>
                <div style={{ color: "#474747" }}>
                  <h2 style={{ fontSize: "25px" }}>Clientes</h2>
                  <h3
                    style={{
                      fontFamily: "Product-Sans",
                      fontWeight: "normal",
                      fontSize: "15px",
                    }}
                  >
                    Ativos
                  </h3>
                </div>
                <GraficoClientesAtivos idOficina={idOficina} />
              </div>

              <div className={style["kp2"]}>
                <div style={{ color: "#474747" }}>
                  <h2 style={{ fontSize: "25px" }}>Estoque</h2>
                  <h3
                    style={{
                      fontFamily: "Product-Sans",
                      fontWeight: "normal",
                      fontSize: "15px",
                    }}
                  >
                    Acabando
                  </h3>

                  <div className={style["cabeçalho_kp2"]}>
                    <span style={{ marginRight: "17vw" }}>Itens</span>
                    <span>Quantidade</span>
                  </div>

                  <div className={style["container_registros_kp2"]}>
                    {estoqueBaixo.map((produto) => (
                      <div className={style["registro"]} key={produto.id}>
                        <div style={{width: "65%"}}><span id="nomeProduto">{produto.nome}</span></div>
                        <div><span id="qtdProduto">{produto.quantidade}</span></div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style["box"]}>
          <h1>Tarefas</h1>
          <div className={style["container_tarefas"]}>
            <div className={style["container_tarefas_botoes"]}>
              <Botao nome={"Hoje"} cor={"#C66D2C"} onClick={handleFiltrarHoje} />
              <Botao style={{ fontColor: "#474747" }} nome={"Todas"} cor={"#DFDEDB"} corFont={"#474747"} onClick={handleMostrarTodas} />
              <a onClick={handleNavigate} style={{ cursor: "pointer" }}><img src={Add} alt="" style={{ width: "50px" }} /></a>
            </div>

            <div className={style["container_tarefas_modal"]}>
              <Tarefa tarefas={filtroHoje ? tarefasHoje : tarefas} setTarefas={setTarefas} />
            </div>
          </div>
        </div>
      </Alignner>
    </div>
  );
};

export default Home;