import React from "react";
import style from "./Excluir.module.css";

const Cliente = () => {
    return (
        <div className={style["body"]}>
            <div className={style["container"]}>
                <h1>Excluir</h1>
                <h4>Tem certeza que deseja excluir?</h4>
                <div className={style["botao"]}>
                    <a>Sim</a>
                    <a>Não</a>
                </div>
            </div>
        </div>
    );
};

export default Cliente;
