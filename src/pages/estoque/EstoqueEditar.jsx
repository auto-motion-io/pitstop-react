import React, { useEffect, useState } from "react";
import style from "./Estoque.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import api from "../../services/api";
import { toast } from "react-toastify";

const EstoqueEditar = () => {
    const [nomeProduto, setNomeProduto] = useState("");
    const [modeloVeiculo, setModeloVeiculo] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [valorCompra, setvalorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [garantia, setGarantia] = useState("");

    // async function handleEditar() {
    //     try{
    //         await api.put(`/estoque/${idCliente}`, {
    //             nome: nome,
    //             telefone: telefone,
    //             email: email,
    //         });
    //         toast.success('Dados editados com sucesso!');
    //         navigate("/clientes");
    //     } catch (error) {
    //         toast.error('Erro ao editar dados!');
    //     }
    // }

    // function handleValorEditar() {
    //     api.get(`/estoque/${idCliente}`)
    //     .then((response) => {
    //         setNomeProduto(response.data.nome);
    //         setModeloVeiculo(response.data.telefone);
    //         setQuantidade(response.data.email);
    //         setLocalizacao(response.data.email);
    //         setvalorCompra(response.data.email);
    //         setValorVenda(response.data.email);
    //         setValorServico(response.data.email);
    //         setGarantia(response.data.email);
    //     })
    //     .catch((error) => {
    //         console.log("Erro foi esse aqui: ", error);
    //     });
    // }

    // useEffect(() => {
    //     handleValorEditar();
    // }, []);

    const inputs = (
        <div className={style["inputs"]}>
            <Input nome={"Nome"} tipo={"text"} value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} tamanho={"100%"} />
            <Input nome={"Modelo de Veículo"} tipo={"text"} value={modeloVeiculo} onChange={(e) => setModeloVeiculo(e.target.value)} tamanho={"100%"} />
            <div className={style["input-row"]}>
                <Input nome={"Quantidade"} tipo={"number"} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} tamanho={"100%"} />
                <Input nome={"Localização"} tipo={"text"} value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} tamanho={"100%"} />
            </div>
            <div className={style["input-row"]}>
                <Input nome={"Valor de Compra"} tipo={"text"} value={valorCompra} onChange={(e) => setvalorCompra(e.target.value)} tamanho={"100%"} />
                <Input nome={"Valor de Venda"} tipo={"text"} value={valorVenda} onChange={(e) => setValorVenda(e.target.value)} tamanho={"100%"} />
            </div>
            <div className={style["input-row"]}>
                <Input nome={"Valor de Serviço"} tipo={"text"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} tamanho={"100%"} />
                <Input nome={"Garantia"} tipo={"text"} value={garantia} onChange={(e) => setGarantia(e.target.value)} tamanho={"100%"} />
            </div>
        </div>
    );
    return (
        <>
            <div>
                <NavBar currentPage={"estoque"} />
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Estoque" resposta={["Nome", "Quantidade", "Localização", "Valor Venda", "Garantia", "Ações"]} />
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} inputs={inputs} />
            </div>
        </>
    );
};

export default EstoqueEditar;
