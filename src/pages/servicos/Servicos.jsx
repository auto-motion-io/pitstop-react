import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";

const Servicos = () => {
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [descricao, setDescricao] = useState("");

    const inputs = (
        <div>
            <Input nome={"Nome do Serviço*"} tipo={"text"} value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} tamanho={"100%"} />
            <Input nome={"Valor*"} tipo={"text"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} tamanho={"50%"} />
            <Input nome={"Descrição"} tipo={"text"} value={descricao} onChange={(e) => setDescricao(e.target.value)} tamanho={"100%"} altura ={"130px"} />
        </div>
    );
    return (

    <>
        <div>
            <NavBar currentPage={"servicos"} />
        </div>
        <Alignner >
            <BoxInfo titulo="Serviços" resposta={["Nome", "Valor", "Ações"]} />
            <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} cor={"#C66D2C"} />
        </Alignner>
    </>
    );
};

export default Servicos;
