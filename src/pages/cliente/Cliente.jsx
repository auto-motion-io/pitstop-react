import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import { inputMascaraTelefoneCelular, verificaEmail } from "../../utils/global";

const Cliente = () => {
    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const inputs =
        <div>
            <Input nome={"Nome*"} tipo={"text"} value={nome} onChange={(e) => setNome(e.target.value)} tamanho={"100%"} />
            <Input nome={"Sobrenome*"} tipo={"text"} value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} tamanho={"100%"} />
            <Input nome={"Telefone*"} tipo={"text"} value={telefone} onChange={(e) => setTelefone(e.target.value)} onInput={inputMascaraTelefoneCelular} maxLength={15} tamanho={"80%"} />
            <Input nome={"E-mail*"} tipo={"text"} value={email} onChange={(e) => setEmail(e.target.value)} onInput={verificaEmail} tamanho={"100%"} />
        </div>
    return (
        <>
            <div>
                <NavBar currentPage={"clientes"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]} />
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} />
            </Alignner>
        </>
    );
};

export default Cliente;
