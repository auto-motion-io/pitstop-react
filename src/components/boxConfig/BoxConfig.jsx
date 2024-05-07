import React from "react";
import style from "./BoxConfig.module.css";
// import Titulo from "../../components/titulo/Titulo";
import Input from "../input/Input";
import Botao from "../botao/Botao";

const BoxConfig = ({ qtdInput, nomeInput, titulo, nomeBotao }) => {
    var inputs = [];
    var nome = [];
    var tamanho = [];
    var altura = [];
    for (let i = 0; i < qtdInput; i++) {
        var split = nomeInput[i].split(";");
        nome.push(split[0]);
        tamanho.push(split[1]);
        altura.push(split[2] ? split[2] : null);
        inputs.push(<Input nome={nome[i]} tamanho={tamanho[i]} altura={altura[i]} />);
    }
    return (
        <div className={style["box"]}>
            <h1>{titulo}</h1>
            <div className={style["container"]}>
                <div className={style["inputs"]}>
                    {inputs}
                </div>
                <div className={style["botao"]}>
                <Botao nome={"Cadastrar"} cor={"#C66D2C"} />
                </div>
            </div>
        </div>
    );
};

export default BoxConfig;
