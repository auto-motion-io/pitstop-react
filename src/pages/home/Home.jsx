// Home.js
import React from 'react';
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import style from "./Home.module.css";
import Botao from "../../components/botao/Botao";
import Add from "../../utils/assets/botao-add-laranja.svg";
import Tarefa from "../../components/tarefa/Tarefa";
import GraficoOrdensPendentes from '../../components/graficoOrdensPendentes/GraficoOrdensPendentes';
import GraficoClientesAtivos from '../../components/graficoClientesAtivos/GraficoClientesAtivos';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/adicionar-tarefa`);
}

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

                  <GraficoOrdensPendentes/>
          
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
                <GraficoClientesAtivos/>
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

                  <div className={style["cabeçalho_kp2"]} >
                    <span style={{ marginRight: "17vw" }}>Itens</span>
                    <span>Quantidade</span>

                  <div className={style["container_registros_kp2"]}>
                    <div className={style["registro"]}>
                    <span style={{ marginRight: "13.5vw" }}>Filtro de óleo</span>
                    <span>5</span>
                    </div>

                    
                  </div>
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
              <Botao nome={"Hoje"} cor={"#C66D2C"} />
              <Botao style={{ fontColor: "#474747" }} nome={"Todas"} cor={"#DFDEDB"} corFont={"#474747"} />
              <a onClick={handleNavigate} style={{ cursor: "pointer" }}><img src={Add} alt="" style={{ width: "50px" }} /></a>
            </div>

            <div className={style["container_tarefas_modal"]}>
              <Tarefa />
              <Tarefa />
              <Tarefa />
              <Tarefa />
              <Tarefa />
              <Tarefa />
              <Tarefa />
              <Tarefa />
            </div>
          </div>
        </div>
      </Alignner>
    </div>
  );
};

export default Home;