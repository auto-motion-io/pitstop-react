import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import api from "../../services/api";
import { toast } from "react-toastify";

const Servicos = () => {
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [descricao, setDescricao] = useState("");
    const [garantia, setGarantia] = useState("");

    const inputs = (
        <div>
            <Input nome={"Nome do Serviço*"} tipo={"text"} value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} tamanho={"100%"} />
            <Input nome={"Valor*"} tipo={"text"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} tamanho={"50%"} />
            <Input nome={"Descrição"} tipo={"text"} value={descricao} onChange={(e) => setDescricao(e.target.value)} tamanho={"100%"} altura ={"130px"} />
            <Input nome={"Garantia"} tipo={"text"} value={garantia} onChange={(e) => setGarantia(e.target.value)} tamanho={"100%"} altura ={"130px"} />
        </div>
    );

    function handleCadastro() {
        api.post("/servicos", {
            nome: nomeServico,
            descricao: descricao,
            valorServico: valorServico,
            garantia: garantia,
            fkOficina: sessionStorage.getItem("idOficina")
        }).then((response) => {
            console.log(response.data);
            toast.success('Serviço cadastrado com sucesso!');
        }).catch((error) => {
            console.log("Erro foi esse aqui - Serviço: ", error);
            toast.error('Erro ao cadastrar serviço!');
        });
    }

    return (

    <>
        <div>
            <NavBar currentPage={"servicos"} />
        </div>
        <Alignner >
            <BoxInfo titulo="Serviços" resposta={["Nome", "Descrição", "Valor", "Garantia", "Ações"]} endpoint={"/servicos"}/>
            <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} cor={"#C66D2C"} onClick={handleCadastro} />
        </Alignner>
    </>
    );
};

export default Servicos;
