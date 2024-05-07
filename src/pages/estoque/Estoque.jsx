import React from "react";
import style from "./Estoque.module.css";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";

const Estoque = () => {
    return (
        <>
            <div>
                <NavBar currentPage={"estoque"}/>
            </div>
            <div className={style["container"]}>
                <BoxInfo titulo="Estoque" resposta={["Nome", "Quantidade", "Lolcalização", "Valor Venda", "Garantia","Ações"]}/>
                <BoxConfig titulo={"Novo"} nomeBotao={"Cadastrar"} qtdInput={5} nomeInput={["Nome do Produto*;100%", "Modelo do Veiculo*;100%", "Quantidade*;39%", "Localização*;59%", "Valor de Compra*;80%"]}/>
            </div>
        </>
    );
};

export default Estoque;
