import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import api from "../../services/api";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";
import { useNavigate, useParams } from "react-router-dom";

const ServicosEditar = () => {
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [descricao, setDescricao] = useState("");
    const [garantia, setGarantia] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    const inputs =
        <div>
            <Input nome={"Nome*"} type={"text"} value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} tamanho={"100%"} />
            <Input nome={"Valor de Serviço*"} type={"text"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} maxLength={15} tamanho={"80%"} />
            <Input nome={"Descrição*"} type={"text"} value={descricao} onChange={(e) => setDescricao(e.target.value)} tamanho={"100%"} />
            <Input nome={"Garantia*"} type={"text"} value={garantia} onChange={(e) => setGarantia(e.target.value)} tamanho={"100%"} />
        </div>

    async function handleEditar() {
        try{
            await api.put(`/servicos/${id}`, {
                nome: nomeServico,
                descricao: descricao,
                valorServico: valorServico,
                garantia: garantia,
                fkOficina: sessionStorage.getItem("idOficina")
            });
            toast.success('Dados editados com sucesso!');
            navigate("/servicos");
        } catch (error) {
            toast.error('Erro ao editar dados!');
        }
    }

    function handleValorEditar() {
        api.get(`/servicos/${id}`)
        .then((response) => {
            setNomeServico(response.data.nome);
            setDescricao(response.data.descricao);
            setGarantia(response.data.garantia);
            setValorServico(response.data.valorServico);
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
                <NavBar currentPage="servicos" />
            </div>
            <Alignner>
                <BoxInfo titulo="Serviços" resposta={["Nome", "Descrição", "Valor", "Garantia", "Ações"]} endpoint={"/servicos"}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} inputs={inputs} onClick={handleEditar}/>
            </Alignner>
        </>
    );
};

export default ServicosEditar;
