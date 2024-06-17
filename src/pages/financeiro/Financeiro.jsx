// Home.js
import React from "react";
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import style from "./Financeiro.module.css";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import calendario from "../../utils/assets/calendario.svg";
import GraficoEntradaSaida from "../../components/graficoEntradaSaida/GraficoEntradaSaida";
import { useNavigate } from 'react-router-dom';

const Financeiro = () => {

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/todos-financeiro`);
}

  const inputs = (
    <div>
      <Input nome={"Transação*"} tipo={"text"} tamanho={"100%"} />
      <Input nome={"Categoria*"} tipo={"text"} tamanho={"100%"} />
      <div style={{ display: "flex", width: "100%" }}>
        <Input nome={"Produto*"} tipo={"text"} maxLength={15} tamanho={"90%"} />
        <Input nome={"Quantidade*"} tipo={"text"} tamanho={"100%"} />
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <Input nome={"Valor*"} tipo={"text"} tamanho={"90%"} />
        <Input nome={"Forma de Pagamento*"} tipo={"text"} tamanho={"100%"} />
      </div>

      <Input nome={"Data de Lançamento*"} tipo={"text"} tamanho={"50%"} />
    </div>
  );
  return (
    <div>
      <div>
        <NavBar currentPage={"financeiro"} />
      </div>

      <Alignner>
        <div className={style["box"]}>
          <div className={style["titulo"]}>
            <h1>Finaceiro</h1>
            <button onClick={handleNavigate} className={style["botao_vertodos"]}>Ver Todos</button>
          </div>

          <div className={style["container"]}>
            <div className={style["container_entradas_saidas"]}>
              <div
                className={style["entrada_saidas"]}
                style={{ border: "3.5px solid #C66D2C" }}
              >
                <span
                  style={{ fontFamily: "Product-Sans-bold", fontSize: "27px" }}
                >
                  Entradas
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span>R$</span> <span>8.547,75</span>
                </div>
              </div>

              <div
                className={style["entrada_saidas"]}
                style={{ border: "3.5px solid #C66D2C" }}
              >
                <span
                  style={{ fontFamily: "Product-Sans-bold", fontSize: "27px" }}
                >
                  Saídas
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span>R$</span> <span>2.457,45</span>
                </div>
              </div>

              <div
                className={style["entrada_saidas"]}
                style={{ backgroundColor: "#C66D2C" }}
              >
                <span
                  style={{
                    fontFamily: "Product-Sans-bold",
                    fontSize: "27px",
                    color: "#F1EFE9",
                  }}
                >
                  {" "}
                  Saldo
                </span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span
                    style={{
                      fontFamily: "Product-Sans-bold",
                      color: "#F1EFE9",
                    }}
                  >
                    R$
                  </span>{" "}
                  <span
                    style={{
                      fontFamily: "Product-Sans-bold",
                      color: "#F1EFE9",
                    }}
                  >
                    6.090,3
                  </span>
                </div>
              </div>
            </div>

            <div className={style["titulo"]}>
              <div style={{ width: "100%" }}>
                <h1>Resumo</h1>
                <span style={{ fontFamily: "Product-Sans", fontSize: "15px" }}>
                  Entradas X Saídas
                </span>
              </div>

              <div className={style["input-calendario"]}>
                <div className={style["calendario"]}>
                  <img src={calendario} alt="Imagem de Calendario" />
                </div>
                <input type="text" />
              </div>

             
            </div>
            <GraficoEntradaSaida/>
          </div>
        </div>

        <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} />
      </Alignner>
    </div>
  );
};

export default Financeiro;
