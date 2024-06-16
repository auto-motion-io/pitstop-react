import React from "react";
import style from "./AdicionarTarefa.module.css";

const AdicionarTarefa = () => {
    return (
        <div className={style["body"]}>
        <div className={style["container"]}>
            <div className={style["titulo"]}>
                <h1>Excluir</h1>
            </div>
            <h4>Tem certeza que deseja excluir?</h4>
            <div className={style["botao"]}>
                <a>Sim</a>
                <a>Não</a>
            </div>
        </div>
    </div>
    )


}

export default AdicionarTarefa;