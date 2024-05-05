import React from "react";
import style from "./BoxInfo.module.css";
import Titulo from "../../components/titulo/Titulo";
import setaVoltarLaranja from "../../utils/assets/seta-voltar-laranja.svg";
import setaAvancar from "../../utils/assets/seta-avancar.svg";

const BoxInfo = ({ titulo = "Clientes", resposta }) => {
    const coluna = resposta.map((item, index) => (
        <div className={style["coluna"]} key={index}>
            <h3>{item}</h3>
        </div>
    ));

    return (
        <div className={style["box"]}>
            <Titulo nomeTitulo={titulo} />
            <div className={style["container"]}>
                <div className={style["header-coluna"]}>
                    {coluna}
                </div>
                <div className={style["linhas"]}>

                </div>
                <div className={style["mudar-pagina"]}>
                    <a><img src={setaVoltarLaranja} alt="Seta de Voltar" /></a>
                    <a><img src={setaAvancar} alt="Seta de Avançar" /></a>
                </div>
            </div>
        </div>
    );
};

export default BoxInfo;
