import React, { useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import { inputMascaraTelefoneCelular, verificaEmail } from "../../utils/global";
import style from "./OrdemServico.module.css";
import lupa from "../../utils/assets/lupa.svg";

const OrdemServico = () => {

    return (
        <>
            <div>
                <NavBar currentPage={"os"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Ordens" resposta={["Cliente", "Status", "Ações"]} tamanho="28vw" hasInput={false} ordem={true} />
                <div className={style["container"]}>
                    <div className={style["box-header"]}>
                        <h1>#2559</h1>
                        <div className={style["box-header-inputs"]}>
                            <Input nome={"Status"} tamanho={"8vw"} />
                            <Input nome={"Garantia"} tamanho={"8vw"} />
                            <h2><b>Token</b><br />E0BZZ</h2>
                        </div>
                    </div>
                    <div className={style["box-veiculo"]}>
                        <h1>Veículo</h1>
                        <div className={style["input-lupa"]}>
                            <div className={style["lupa"]}><img src={lupa} alt="Imagem de Lupa" /></div>
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </Alignner>
        </>
    );
};

export default OrdemServico;