// Home.js
import React from "react";
import style from "./TodosFinanceiro.module.css";
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import { useNavigate } from 'react-router-dom';
import calendario from "../../utils/assets/calendario.svg";
import BoxInfo from "../../components/boxInfo/BoxInfo";

const TodosFinanceiro = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(`/todos-financeiro`);
  }

  const inputs = (
    <div>
      <Input nome={"Transação*"} type={"text"} tamanho={"100%"}  />
      <div style={{ display: "flex", width: "100%" }}>
        <Input nome={"Valor*"} type={"number"} tamanho={"90%"}  />
        <Input nome={"Forma de Pagamento*"} type={"text"} tamanho={"100%"}  />
      </div>
      <Input nome={"Data de Lançamento*"} type={"date"} tamanho={"50%"} />
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
      <BoxInfo titulo="Financeiro" resposta={["Transação", "Categoria", "Valor(R$)", "Data de Lançamento", "Ações"]} />
        <BoxConfig titulo={"Novo"} nomeBotao={"Editar"} inputs={inputs} />
      </Alignner>
    </div>
    );
  };
  
  export default TodosFinanceiro;
  