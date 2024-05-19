import React, { useState, useEffect } from "react";
import style from "./BoxInfo.module.css";
import Titulo from "../../components/titulo/Titulo";
import setaVoltarLaranja from "../../utils/assets/seta-voltar-laranja.svg";
import setaAvancar from "../../utils/assets/seta-avancar.svg";
import lupa from "../../utils/assets/lupa.svg";
import calendario from "../../utils/assets/calendario.svg";
import api from "../../api";
import LinhaRegistro from "../linhaRegistro/LinhaRegistro";

const BoxInfo = ({ titulo = "Clientes", resposta, tamanho = "62vw", ordem = false, endpoint }) => {
    const coluna = resposta.map((item, index) => (
        <div className={style["coluna"]} key={index}>
            <h3>{item}</h3>
        </div>
    ));

    const [dataRegistro, setDataRegistro] = useState(null);

    let linhas = "";

    async function buscar() {
        try {
            const response = await api.get(endpoint);
            setDataRegistro(response.data);
            linhas = <LinhaRegistro registro={dataRegistro} />;
        } catch (error) {
            console.log("Erro foi esse aqui: ", error);
        }
    }

    useEffect(() => {
        buscar();
    }, []);

    let info = "";
    if (!ordem) {
        info = (
            <div className={style["box"]}>
                <Titulo nomeTitulo={titulo} />
                <div className={style["container"]} style={{ width: tamanho }}>
                    <div className={style["header-coluna"]}>{coluna}</div>
                    <div className={style["linhas"]}>{linhas}</div>
                    <div className={style["mudar-pagina"]}>
                        <a>
                            <img src={setaVoltarLaranja} alt="Seta de Voltar" />
                        </a>
                        <a>
                            <img src={setaAvancar} alt="Seta de Avançar" />
                        </a>
                    </div>
                </div>
            </div>
        );
    } else {
        info = (
            <div className={style["box"]}>
                <Titulo nomeTitulo={titulo} hasInput={false} />
                <div className={style["container-ordem"]} style={{ width: "28vw" }}>
                    <div className={style["inputs-row"]}>
                        <div className={style["input-lupa"]}>
                            <div className={style["lupa"]}>
                                <img src={lupa} alt="Imagem de Lupa" />
                            </div>
                            <input type="text" />
                        </div>
                        <div className={style["input-calendario"]}>
                            <div className={style["calendario"]}>
                                <img src={calendario} alt="Imagem de Calendario" />
                            </div>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <>{info}</>;
};

export default BoxInfo;
