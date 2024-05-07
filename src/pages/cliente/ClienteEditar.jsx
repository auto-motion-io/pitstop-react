import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";

const ClienteEditar = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <Alignner>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} qtdInput={4} nomeInput={["Nome*;100%", "Sobrenome*;100%", "Telefone*;80%", "E-mail*;100%"]}/>
            </Alignner>
        </>
    );
};

export default ClienteEditar;
