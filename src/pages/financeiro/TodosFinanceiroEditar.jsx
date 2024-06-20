// Home.js
import React, { useEffect, useState } from "react";
import style from "./TodosFinanceiro.module.css";
import NavBar from "../../components/navbar/NavBar";
import Alignner from "../../components/alignner/Alignner";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import { useNavigate, useParams } from 'react-router-dom';
import calendario from "../../utils/assets/calendario.svg";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import { toast } from "react-toastify";
import api from "../../services/api";

const TodosFinanceiroEditar = () => {
  const [transacao, setTransacao] = useState("entrada");
  const [categoria, setCategoria] = useState("");
  const [valor, setValor] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("");
  const [data, setData] = useState("");
  const { id } = useParams();

  const idOficina = sessionStorage.getItem("idOficina");

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/todos-financeiro`);
  }

  function editarFinanceiro() {
    api.put(`/financeiro/atualiza/${id}`, {
      transacao: transacao,
      categoria: categoria,
      valor: valor,
      formaPagamento: formaPagamento,
      data: data,
      idOficina: sessionStorage.getItem("idOficina")
    }).then((response) => {
      toast.success('Transação editada com sucesso!');
      navigate("/todos-financeiro");
    }).catch((error) => {
      toast.error('Erro ao editar transação!');
    });
  }

  const inputs = (
    <div>
      <Input nome={"Categoria*"} type={"text"} tamanho={"100%"} value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <div style={{ display: "flex", width: "100%" }}>
        <Input nome={"Valor*"} type={"number"} tamanho={"90%"} value={valor} onChange={(e) => setValor(e.target.value)} />
        <Input nome={"Forma de Pagamento*"} type={"text"} tamanho={"100%"} value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} />
      </div>
      <Input nome={"Data de Lançamento*"} type={"date"} tamanho={"50%"} value={data} onChange={(e) => setData(e.target.value)} />
      <div className={style["select"]} >
        <span>Transação</span>
        <select id="transacao" value={transacao} onInput={(e) => setTransacao(e.target.value)} name="transacao">
          <option selected disabled>Transação</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
      </div>
    </div>
  );

  function handleValoresEditar() {
    api.get(`/financeiro/oficina/${sessionStorage.getItem("idOficina")}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id == id) {
            setTransacao(response.data[i].transacao);
            setCategoria(response.data[i].categoria);
            setValor(response.data[i].valor);
            setFormaPagamento(response.data[i].formaPagamento);
            setData(response.data[i].data);
          }
        }
      }).catch((error) => {
        toast.error('Erro ao buscar transação!');
      });
  }

  useEffect(() => {
    handleValoresEditar();
  }, []);

  return (
    <div>
      <div>
        <NavBar currentPage={"financeiro"} />
      </div>

      <Alignner>
        <BoxInfo titulo="Financeiro" resposta={["Transação", "Categoria", "Data de Lançamento", "Valor(R$)", "Data de Lançamento", "Ações"]} endpoint={"/financeiro"} />
        <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} inputs={inputs} onClick={editarFinanceiro} />
      </Alignner>
    </div>
  );
};

export default TodosFinanceiroEditar;
