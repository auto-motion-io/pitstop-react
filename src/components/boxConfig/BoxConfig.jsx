import React from "react";
import style from "./BoxConfig.module.css";
import Botao from "../botao/Botao"

const BoxConfig = ({ titulo, nomeBotao, inputs, cor = "#C66D2C" }) => {

    return (
        <div className={style["box"]}>
            <h1>{titulo}</h1>
            <div className={style["container"]}>
                {inputs}
                <div className={style["botao"]}>
                    <Botao nome={nomeBotao} cor={cor} />
                </div>
            </div>
        </div>
    );
};

export default BoxConfig;
