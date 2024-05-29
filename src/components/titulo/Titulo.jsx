import React, { useState } from "react";
import style from "./Titulo.module.css";
import lupa from "../../utils/assets/lupa.svg";
import SelectInput from "../selectInput/SelectInput";

const Titulo = ({ nomeTitulo = "Clientes", hasInput = true }) => {

    const [filtro, setFiltro] = useState("");

    let input = "";
    if (hasInput) {
        input = 
        <div>
            <SelectInput/>
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
