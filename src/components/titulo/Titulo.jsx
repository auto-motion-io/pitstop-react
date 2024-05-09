import React from "react";
import style from "./Titulo.module.css";
import lupa from "../../utils/assets/lupa.svg";

const Titulo = ({ nomeTitulo = "Clientes", hasInput = true }) => {
    let input = "";
    if (hasInput) {
        input = 
        <div className={style["input-lupa"]}>
            <div className={style["lupa"]}><img src={lupa} alt="Imagem de Lupa" /></div>
            <input type="text" />
        </div>
    }
    return (
        <>
            <div className={style["container"]}>
                <h1>{nomeTitulo}</h1>
                {input}
            </div>
        </>
    );
};

export default Titulo;
