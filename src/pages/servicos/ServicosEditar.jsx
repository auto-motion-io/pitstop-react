import React from "react";
import style from "./Servicos.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";

const ServicosEditar = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Serviços" resposta={["Nome", "Valor", "Garantia", "Ações"]}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} qtdInput={3} nomeInput={["Nome;100%", "Valor*;100%", "Descrição*;100%;20vh"]}/>
            </div>
        </>
    );
};

export default ServicosEditar;
