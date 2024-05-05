import React from 'react';
import styles from './MenuConfig.module.css';
import pneuConfig from "./../../utils/assets/pneu-config.svg";
import engrenagemConfig from "./../../utils/assets/engrenagem-lupa.svg";
import galeria from "./../../utils/assets/galeria.svg";
import { useNavigate } from 'react-router-dom';

function MenuConfig({ativo = 1}) {
    const navigate = useNavigate();

    function mudarPagina(pagina) {
        navigate(pagina);
    }

    return (
        <div className={styles["menu-left"]}>
            <div className={styles["imgs-cima"]}>
                <a onClick={() => mudarPagina("/configuracoes")}>
                    <div className={ativo === 1 ? styles["img-config"] + " " + styles["active"] : styles["img-config"]}>
                        <img src={pneuConfig} alt="Configurações" />
                    </div>
                </a>
                <a onClick={() => mudarPagina("/configuracoes/mecanica")}>
                    <div className={ativo === 2 ? styles["img-config"] + " " + styles["active"] : styles["img-config"]}>
                        <img src={engrenagemConfig} alt="Configurações" />
                    </div>
                </a>
            </div>
            <a onClick={() => mudarPagina("/configuracoes/galeria")}>
                <div className={ativo === 3 ? styles["img-config"] + " " + styles["active"] : styles["img-config"]}>
                    <img src={galeria} alt="Configurações" />
                </div>
            </a>
        </div>
    );
}

export default MenuConfig;