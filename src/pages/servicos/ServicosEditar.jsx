import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";

const ServicosEditar = () => {
    return (
        <>
            <div>
                <NavBar />
            </div>
            <Alignner>
                <BoxInfo titulo="Serviços" resposta={["Nome", "Valor", "Garantia", "Ações"]}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} qtdInput={3} nomeInput={["Nome;100%", "Valor*;100%", "Descrição*;100%;20vh"]}/>
            </Alignner>
        </>
    );
};

export default ServicosEditar;
