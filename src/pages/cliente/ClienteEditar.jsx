import React from "react";
import style from "./Cliente.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";

const ClienteEditar = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} qtdInput={4} nomeInput={["Nome*;100%", "Sobrenome*;100%", "Telefone*;80%", "E-mail*;100%"]}/>
            </div>
        </>
    );
};

export default ClienteEditar;
