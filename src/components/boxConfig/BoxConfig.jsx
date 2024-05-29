import React from "react";
import style from "./BoxConfig.module.css";
import Botao from "../botao/Botao"

const BoxConfig = ({ titulo, nomeBotao, inputs, cor = "#C66D2C", onClick={onclick} }) => {

    return (
        <div className={style["box"]}>
            <h1>{titulo}</h1>
            <div className={style["container"]}>
                {inputs}
                <div className={style["botao"]}>
                    <Botao nome={nomeBotao} cor={cor} onClick={onClick}/>
                </div>
            </div>
        </div>
    );
};

export default BoxConfig;
