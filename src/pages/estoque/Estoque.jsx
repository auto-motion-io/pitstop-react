import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";

const Estoque = () => {
    return (
        <>
            <div>
                <NavBar currentPage={"estoque"}/>
            </div>
            <Alignner>
                <BoxInfo titulo="Estoque" resposta={["Nome", "Quantidade", "Lolcalização", "Valor Venda", "Garantia","Ações"]}/>
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} qtdInput={5} nomeInput={["Nome do Produto*;100%", "Modelo do Veiculo*;100%", "Quantidade*;39%", "Localização*;59%", "Valor de Compra*;80%"]}/>
            </Alignner>
        </>
    );
};

export default Estoque;
