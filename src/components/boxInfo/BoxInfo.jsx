import React from "react";
import style from "./BoxInfo.module.css";
import Titulo from "../../components/titulo/Titulo";
import setaVoltarLaranja from "../../utils/assets/seta-voltar-laranja.svg";
import setaAvancar from "../../utils/assets/seta-avancar.svg";
import lupa from "../../utils/assets/lupa.svg";
import calendario from "../../utils/assets/calendario.svg";
import SelectInput from "../selectInput/SelectInput";

const BoxInfo = ({ titulo = "Clientes", resposta, tamanho = "62vw", ordem = false }) => {
    const coluna = resposta.map((item, index) => (
        <div className={style["coluna"]} key={index}>
            <h3>{item}</h3>
        </div>
    ));
    let info = "";
    if (!ordem) {
        info =
            <div className={style["box"]}>
                <Titulo nomeTitulo={titulo} />
                <div className={style["container"]} style={{ width: tamanho }}>
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
    } else {
        info=
        <div className={style["box"]}>
            <Titulo nomeTitulo={titulo} hasInput={false} />
            <div className={style["container-ordem"]} style={{ width: "28vw" }}>
                <div className={style["inputs-row"]}>
                    <div className={style["input-lupa"]}>
                        <div className={style["lupa"]}><img src={lupa} alt="Imagem de Lupa" /></div>
                        <input type="text" /> 
                      
                    </div>



                    <div className={style["input-calendario"]}>
                        <div className={style["calendario"]}><img src={calendario} alt="Imagem de Calendario" /></div>
                        <input type="text" />
                    </div>
                </div>
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
    }

    return (
        <>
        {info}
        </>
    );
};

export default BoxInfo;
