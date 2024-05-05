import React from "react";
import style from "./Titulo.module.css";
import Input from "../input/Input";
import lupa from "../../utils/assets/lupa.svg";

const Titulo = ({nomeTitulo = "Clientes"}) => {
    return (
        <>
            <div className={style["container"]}>
                <h1>{nomeTitulo}</h1>
                <div className={style["input-lupa"]}>
                    <div className={style["lupa"]}><img src={lupa} alt="Imagem de Lupa" /></div>
                    <input />
                </div>
            </div>
        </>
    );
};

export default Titulo;
