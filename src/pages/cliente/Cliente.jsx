import React from "react";
import style from "./Cliente.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";

const Cliente = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]}/>
                <BoxConfig qtdInput={4} nomeInput={["Nome*;100%", "Sobrenome*;100%", "Telefone*;85%", "E-mail*;100%"]}/>
            </div>
        </>
    );
};

export default Cliente;
