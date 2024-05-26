import React, { useState } from "react";
import style from "./Estoque.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import Alignner from "../../components/alignner/Alignner";
import api from "../../services/api";
import { toast } from "react-toastify";

const Estoque = () => {
    const [nomeProduto, setNomeProduto] = useState("");
    const [modeloVeiculo, setModeloVeiculo] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [valorCompra, setvalorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [garantia, setGarantia] = useState("");

    const inputs = (
        <div className={style["inputs"]}>
            <Input nome={"Nome*"} tipo={"text"} value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} tamanho={"100%"} />
            <Input nome={"Modelo de Veículo*"} tipo={"text"} value={modeloVeiculo} onChange={(e) => setModeloVeiculo(e.target.value)} tamanho={"100%"} />
            <div className={style["input-row"]}>
                <Input nome={"Quantidade*"} tipo={"number"} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} tamanho={"100%"} />
                <Input nome={"Localização*"} tipo={"text"} value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} tamanho={"100%"} />
            </div>
            <div className={style["input-row"]}>
                <Input nome={"Valor de Compra*"} tipo={"text"} value={valorCompra} onChange={(e) => setvalorCompra(e.target.value)} tamanho={"100%"} />
                <Input nome={"Valor de Venda*"} tipo={"text"} value={valorVenda} onChange={(e) => setValorVenda(e.target.value)} tamanho={"100%"} />
            </div>
            <div className={style["input-row"]}>
                <Input nome={"Valor de Serviço*"} tipo={"text"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} tamanho={"100%"} />
                <Input nome={"Garantia*"} tipo={"text"} value={garantia} onChange={(e) => setGarantia(e.target.value)} tamanho={"100%"} />
            </div>
        </div>
    );

    function handleCadastro() {
        api.post("/produtoEstoque", {
            nomeProduto: nomeProduto,
            modeloVeiculo: modeloVeiculo,
            quantidade: quantidade,
            localizacao: localizacao,
            valorCompra: valorCompra,
            valorVenda: valorVenda,
            valorServico: valorServico,
            garantia: garantia
        }).then((response) => {
            console.log(response.data);
            toast.success('Produto cadastrado com sucesso!');
        }).catch((error) => {
            console.log("Erro foi esse aqui - Produto: ", error);
            toast.error('Erro ao cadastrar produto!');
        });
    }

    return (
        <>
            <div>
                <NavBar currentPage={"estoque"} />
            </div>
            <Alignner >
                <BoxInfo titulo="Estoque" endpoint={"/produtoEstoque"} resposta={["Nome", "Quantidade", "Localização", "Valor Venda", "Garantia", "Ações"]} />
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} cor={"#C66D2C"} onClick={handleCadastro} />
            </Alignner>
        </>
    );
};

export default Estoque;
