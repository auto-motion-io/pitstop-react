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
      <BoxInfo titulo="Financeiro" resposta={["Transação", "Categoria", "Valor(R$)", "Data de Lançamento", "Ações"]} endpoint={""}/>
        <BoxConfig titulo={"Novo"} nomeBotao={"Editar"} inputs={inputs} />
      </Alignner>
    </div>
    );
  };
  
  export default TodosFinanceiro;
  