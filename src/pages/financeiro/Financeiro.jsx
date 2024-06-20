import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import style from "./Financeiro.module.css";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import calendario from "../../utils/assets/calendario.svg";
import GraficoEntradaSaida from "../../components/graficoEntradaSaida/GraficoEntradaSaida";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import { toast } from "react-toastify";

const Financeiro = () => {
  const [transacao, setTransacao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [data, setData] = useState("");

  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const navigate = useNavigate();
  const idOficina = sessionStorage.getItem("idOficina");

  const handleNavigate = () => {
    navigate(`/todos-financeiro`);
  }

  useEffect(() => {
    const fetchFinanceiroInfo = async () => {
      try {
        const response = await api.get(`/financeiro/info-mes/${idOficina}`);
        const { entradas, saidas, saldo } = response.data;
        setEntradas(entradas);
        setSaidas(saidas);
        setSaldo(saldo);
      } catch (error) {
        console.error("Erro ao buscar informações financeiras:", error);
      }
    };

    fetchFinanceiroInfo();
  }, [idOficina]);

  const handleCadastro = () => {
    api.post("/financeiro", {
      transacao,
      categoria,
      valor,
      formaPagamento,
      data,
      idOficina: sessionStorage.getItem("idOficina")
    })
    .then((response) => {
      toast.success('Transação cadastrada com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      toast.error('Erro ao cadastrar a transação. Tente novamente.');
      console.log(error);
    });
  }

  const inputs = (
    <div>
      <Input nome={"Transação*"} type={"text"} tamanho={"100%"} value={transacao} onChange={(e) => setTransacao(e.target.value)} />
      <div style={{ display: "flex", width: "100%" }}>
        <Input nome={"Valor*"} type={"number"} tamanho={"90%"} value={valor} onChange={(e) => setValor(e.target.value)} />
        <Input nome={"Forma de Pagamento*"} type={"text"} tamanho={"100%"} value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} />
      </div>
      <Input nome={"Data de Lançamento*"} type={"date"} tamanho={"50%"} value={data} onChange={(e) => setData(e.target.value)} />
        <div className={style["select"]} >
          <span>Categoria</span>
          <select id="categoria" name="categoria">
          <option selected disabled>Categoria</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
          </select>
        </div>
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
            <h1>Financeiro</h1>
            <button onClick={handleNavigate} className={style["botao_vertodos"]}>Ver Todos</button>
          </div>

          <div className={style["container"]}>
            <div className={style["container_entradas_saidas"]}>
              <div className={style["entrada_saidas"]} style={{ border: "3.5px solid #C66D2C" }}>
                <span style={{ fontFamily: "Product-Sans-bold", fontSize: "27px" }}>Entradas</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span>R$</span><span id="entrada">{entradas.toFixed(2)}</span>
                </div>
              </div>

              <div className={style["entrada_saidas"]} style={{ border: "3.5px solid #C66D2C" }}>
                <span style={{ fontFamily: "Product-Sans-bold", fontSize: "27px" }}>Saídas</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span>R$</span> <span id="saida">{saidas.toFixed(2)}</span>
                </div>
              </div>

              <div className={style["entrada_saidas"]} style={{ backgroundColor: "#C66D2C" }}>
                <span style={{ fontFamily: "Product-Sans-bold", fontSize: "27px", color: "#F1EFE9" }}> Saldo</span>
                <div style={{ display: "flex", gap: "5px" }}>
                  <span style={{ fontFamily: "Product-Sans-bold", color: "#F1EFE9" }}>R$</span>
                  <span style={{ fontFamily: "Product-Sans-bold", color: "#F1EFE9" }} id="saldo">{saldo.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className={style["titulo"]}>
              <div style={{ width: "100%" }}>
                <h1>Resumo</h1>
                <span style={{ fontFamily: "Product-Sans", fontSize: "15px" }}>Últimos 12 Meses</span>
              </div>

              
            </div>
            <GraficoEntradaSaida idOficina={idOficina} />
          </div>
        </div>

        <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} onClick={handleCadastro} />
      </Alignner>
    </div>
  );
};

export default Financeiro;