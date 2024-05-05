import React from "react";
import style from "./Servicos.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";

const Servicos = () => {
    return (
        <>
            <div>
                <NavBar currentPage={"servicos"}/>
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Serviços" resposta={["Nome", "Valor", "Garantia", "Ações"]}/>
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} qtdInput={3} nomeInput={["Nome;100%", "Valor*;100%", "Descrição*;100%;20vh"]}/>
            </div>
        </>
    );
};

export default Servicos;
