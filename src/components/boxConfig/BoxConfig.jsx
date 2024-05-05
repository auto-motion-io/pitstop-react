import React from "react";
import style from "./BoxConfig.module.css";
import Titulo from "../../components/titulo/Titulo";
import Input from "../input/Input";
import Botao from "../botao/Botao";

const BoxConfig = ({ qtdInput, nomeInput }) => {
    var inputs = [];
    var nome = [];
    var tamanho = [];
    for (let i = 0; i < qtdInput; i++) {
        var split = nomeInput[i].split(";");
        nome.push(split[0]);
        tamanho.push(split[1]);
        inputs.push(<Input nome={nome[i]} tamanho={tamanho[i]} />);
    }
    return (
        <div className={style["box"]}>
            <h1>Novo</h1>
            <div className={style["container"]}>
                {inputs}
                <div className={style["button"]}>
                    <a>Cadastrar</a>
                </div>
            </div>
        </div>
    );
};

export default BoxConfig;
