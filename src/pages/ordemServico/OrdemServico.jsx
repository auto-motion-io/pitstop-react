import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import style from "./OrdemServico.module.css";
import lupa from "../../utils/assets/lupa.svg";

const OrdemServico = () => {
    const corInput = "#ECEAE5";
    return (
        <>
            <div>
                <NavBar currentPage={"os"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Ordens" resposta={["Cliente", "Status", "Ações"]} tamanho="28vw" hasInput={false} ordem={true} />
                <div className={style["box"]}>
                    <h1>Nova</h1>
                    <div className={style["container"]}>
                        <div className={style["box-header"]}>
                            <h1>#2559</h1>
                            <div className={style["box-header-inputs"]}>
                                <Input nome={"Status"} tamanho={"8vw"} corBackground={corInput} />
                                <Input nome={"Garantia"} tamanho={"8vw"} corBackground={corInput}/>
                                <h2><b>Token</b><br />E0BZZ</h2>
                            </div>
                        </div>
                        <div className={style["box-veiculo"]}>
                            <h1>Veículo</h1>
                            <Input nome={"Placa*"} imagem={lupa} corBackground={corInput} tamanho={"15%"} />
                            <div className={style["box-veiculo-inputs"]}>
                                <Input nome={"Marca*"} corBackground={corInput} />
                                <Input nome={"Modelo*"} corBackground={corInput} />
                                <Input nome={"Ano*"} corBackground={corInput} />
                                <Input nome={"Cor*"} corBackground={corInput} />
                            </div>
                        </div>
                        <div className={style["box-cliente"]}>
                            <h1>Cliente</h1>
                            <Input nome={"Nome*"} imagem={lupa} corBackground={corInput} tamanho={"95%"}/>
                            <div className={style["box-cliente-inputs"]}>
                                <Input nome={"Telefone*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"}/>
                                <Input nome={"E-mail*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                            </div>
                        </div>

                    </div>
                </div>

            </Alignner>
        </>
    );
};

export default OrdemServico;