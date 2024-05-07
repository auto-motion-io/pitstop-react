import React from "react";
import style from "./BoxConfig.module.css";

const BoxConfig = ({ titulo, nomeBotao, inputs }) => {

    return (
        <div className={style["box"]}>
            <h1>{titulo}</h1>
            <div className={style["container"]}>
                {inputs}
                <div className={style["button"]}>
                    <a>{nomeBotao}</a>
                </div>
            </div>
        </div>
    );
};

export default BoxConfig;
