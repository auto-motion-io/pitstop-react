import React from "react";
import style from "./LinhaRegistro.module.css";

const LinhaRegistro = ( registro ) => {
    console.log("Teste registro: " + registro);
    return (
        <>
            <div className={style["container"]}>
                <div className={style["linha"]}>
                    <div className={style["coluna"]}>
                        <span>{registro.nome}</span>
                    </div>
                    <div className={style["coluna"]}>
                        <span>{registro.telefone}</span>
                    </div>
                    <div className={style["coluna"]}>
                        <span>{registro.email}</span>
                    </div>
                    <div className={style["coluna"]}>
                        <span>Editar</span>
                        <span>Excluir</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LinhaRegistro;