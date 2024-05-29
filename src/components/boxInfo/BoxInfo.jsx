import React, { useState, useEffect } from "react";
import style from "./BoxInfo.module.css";
import Titulo from "../../components/titulo/Titulo";
import lupa from "../../utils/assets/lupa.svg";
import calendario from "../../utils/assets/calendario.svg";
import api from "../../services/api";
import LinhaRegistro from "../linhaRegistro/LinhaRegistro";
import { toast } from "react-toastify";
import SelectInput from "../selectInput/SelectInput";

const BoxInfo = ({ titulo = "Clientes", resposta, tamanho = "62vw", ordem = false, endpoint }) => {
    const coluna = resposta.map((item, index) => (
        <div className={style["coluna"]} key={index}>
            <h3>{item}</h3>
        </div>
    ));

    const [dataRegistro, setDataRegistro] = useState(null);

    async function buscar() {
        try {
            const response = await api.get(endpoint);
            console.log("Response: ", response.data);
            setDataRegistro(response.data);
        } catch (error) {
            switch (error.response.status) {
                case 401:
                    toast.error("Você não tem permissão para acessar esses dados!");
                    break;
                case 404:
                    toast.error("Nenhum registro encontrado!");
                    break;
                default:
                    toast.error("Erro ao buscar registros!")
                    break;
            }
        }
    }

    let linhas = "";
    useEffect(() => {
        buscar();
    }, []);

    if (dataRegistro) {
        linhas = <LinhaRegistro endpoint={endpoint} registros={dataRegistro} />;
    }

    let info = "";
    if (!ordem) {
        info = (
            <div className={style["box"]}>
                <Titulo nomeTitulo={titulo} />
                <div className={style["container"]} style={{ width: tamanho }}>
                    <div className={style["header-coluna"]}>{coluna}</div>
                    <div className={style["linhas"]}>{linhas}</div>
                </div>
            </div>
        );
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
            </div>
        );
    }

    return <>{info}</>;
};

export default BoxInfo;
