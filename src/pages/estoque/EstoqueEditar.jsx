import React, { useEffect, useState } from "react";
import style from "./Estoque.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Input from "../../components/input/Input";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EstoqueEditar = () => {
    const [nomeProduto, setNomeProduto] = useState("");
    const [modelo, setModelo] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [valorCompra, setvalorCompra] = useState("");
    const [valorVenda, setValorVenda] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [garantia, setGarantia] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const inputs = (
        <div className={style["inputs"]}>
            <Input nome={"Nome"} tipo={"text"} value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} tamanho={"100%"} />
            <Input nome={"Modelo de Veículo"} tipo={"text"} value={modelo} onChange={(e) => setModelo(e.target.value)} tamanho={"100%"} />
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

    async function handleEditar() {
        try{
            await api.put(`/produtoEstoque/${id}`, {
                nome : nomeProduto,
                modeloVeiculo : modelo,
                quantidade : quantidade,
                valorComMaoObra : valorServico,
                valorCompra : valorCompra,
                valorVenda : valorVenda,
                garantia : garantia,
                localizacao : localizacao
            });
            toast.success('Dados editados com sucesso!');
            navigate("/produtoEstoque");
        } catch (error) {
            toast.error('Erro ao editar dados!');
        }
    }

    function handleValorEditar() {
        api.get(`/produtoEstoque/${id}`)
        .then((response) => {
            setNomeProduto(response.data.nome);
            setModelo(response.data.modeloVeiculo);
            setQuantidade(response.data.quantidade);
            setLocalizacao(response.data.localizacao);
            setvalorCompra(response.data.valorCompra);
            setValorVenda(response.data.valorVenda);
            setValorServico(response.data.valorComMaoObra);
            setGarantia(response.data.garantia);
        })
        .catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    useEffect(() => {
        handleValorEditar();
    }, []);

    return (
        <>
            <div>
                <NavBar currentPage={"estoque"} />
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Estoque" endpoint={"/produtoEstoque"} resposta={["Nome", "Quantidade", "Localização", "Valor Venda", "Garantia", "Ações"]} />
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} inputs={inputs} onClick={handleEditar} />
            </div>
        </>
    );
};

export default EstoqueEditar;
