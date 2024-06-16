import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import { inputMascaraTelefoneCelular, verificaEmail } from "../../utils/global";
import api from "../../services/api";
import { toast } from "react-toastify";

const Cliente = () => {
    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();

    const inputs =
        <div>
            <Input nome={"Nome*"} tipo={"text"} maxLength={26} value={nome} onChange={(e) => setNome(e.target.value)} tamanho={"100%"} />
            <Input nome={"Telefone*"} tipo={"tel"} value={telefone} onChange={(e) => setTelefone(e.target.value)} onInput={inputMascaraTelefoneCelular} maxLength={15} tamanho={"80%"} />
            <Input nome={"E-mail*"} tipo={"email"} value={email} onChange={(e) => setEmail(e.target.value)} onInput={verificaEmail} tamanho={"100%"} />
        </div>

    

    function handleCadastro() {
        api.post("/clientes", {
            nome: nome,
            telefone: telefone,
            email: email,
            fkOficina: sessionStorage.getItem("idOficina")
        })
        .then((response) => {
            toast.success('Cliente cadastrado com sucesso!');
            setTimeout(() => {
                window.location.reload();
            }, 500);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div>
                <NavBar currentPage={"clientes"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]} endpoint={"/clientes"} />
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} inputs={inputs} onClick={handleCadastro} />
            </Alignner>
        </>
    );
};

export default Cliente;
