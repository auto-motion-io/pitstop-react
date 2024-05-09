import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import style from "./Home.module.css";
import Botao from "../../components/botao/Botao";
import Add from "../../utils/assets/botao-add-laranja.svg"
import Tarefa from "../../components/tarefa/Tarefa";

const Home = () => {
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
              {/* grafico coluna */}
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
              </div>
            </div>

            <div className={style["container_kpi"]}>
              {/* 2 grafico kpi */}

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
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style["box"]}>
          <h1>Tarefas</h1>
                <div className={style["container_tarefas"]}>
                    <div className={style["container_tarefas_botoes"]} >
                        <Botao nome={"Hoje"} cor={"#C66D2C"}/>
                        <Botao style={{ fontColor: "#474747" }} nome={"Todas"} cor={"#DFDEDB"} corFont={"#474747"}/>
                        <img src={Add} alt="" style={{width: "50px"}} />
                    </div>

                    <div className={style["container_tarefas_modal"]}>
                    <Tarefa/>
                    <Tarefa/>
                    </div>
                </div>
        </div>
      </Alignner>
    </div>
  );
};

export default Home;
