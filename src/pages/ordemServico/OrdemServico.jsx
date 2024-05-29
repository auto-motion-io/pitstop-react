import React from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import style from "./OrdemServico.module.css";
import lupa from "../../utils/assets/lupa.svg";
import botaoAdicionar from "../../utils/assets/botao-add-laranja.svg";
import Botao from "../../components/botao/Botao";

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
                        <div className={style["box-container"]}>
                            <div className={style["box-header"]}>
                                <h1>#2559</h1>
                                <div className={style["box-header-inputs"]}>
                                    <Input nome={"Status"} tamanho={"8vw"} corBackground={corInput} />
                                    <Input nome={"Garantia"} tamanho={"8vw"} corBackground={corInput} />
                                    <h2><b>Token</b><br />E0BZZ</h2>
                                </div>
                            </div>
                            <div className={style["box-veiculo"]}>
                                <h1>Veículo</h1>
                                <Input nome={"Placa*"} imagem={lupa} corBackground={corInput} tamanho={"10vw"} tamanhoFundo={"100%"} />
                                <div className={style["box-veiculo-inputs"]}>
                                    <Input nome={"Marca*"} tamanho={"15vw"} corBackground={corInput} />
                                    <Input nome={"Modelo*"} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Ano*"} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Cor*"} tamanho={"12vw"} corBackground={corInput} />
                                </div>
                            </div>
                            <div className={style["box-cliente"]}>
                                <h1>Cliente</h1>
                                <Input nome={"Nome*"} imagem={lupa} corBackground={corInput} tamanho={"95%"} />
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Telefone*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"E-mail*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                            </div>

                            <div className={style["box-responsavel"]}>
                                <h1>Responsável</h1>
                                <Input nome={"Nome*"} imagem={lupa} corBackground={corInput} tamanho={"30%"} tamanhoFundo={"100%"} />
                            </div>

                            <div className={style["box-prazo-cliente"]}>
                                <div className={style["tema-prazos"]}>
                                    <h1>Prazos</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <Input nome={"Telefone*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                        <Input nome={"E-mail*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    </div>
                                </div>
                                <div className={style["tema-classificacao"]}>
                                    <h1>Classificação</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <Input nome={"Telefone*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    </div>
                                </div>
                            </div>

                            <div className={style["box-produtos"]}>
                                <h1>Produtos</h1>
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Telefone*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"Valor Unidade*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    <Input nome={"Quantidade*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    <Input nome={"Garantia*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    <Input nome={"Valor Total*"} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                                <div className={style["box-add"]}>
                                    <a ><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-servicos"]}>
                                <h1>Serviços</h1>
                                <div className={style["box-servicos-inputs"]}>
                                    <Input nome={"Nome*"} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"35%"} />
                                    <Input nome={"Valor*"} corBackground={corInput} tamanho={"70%"} />
                                </div>
                                <div className={style["box-add"]}>
                                    <a><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-observacoes"]}>
                                <h1>Observações</h1>
                                <textarea name="" id=""></textarea>
                            </div>

                            <div className={style["box-valor"]}>
                                <div className={style["titulo"]}><h1>Valor Total</h1></div>
                                <div className={style["valor"]}><h1>R$1566,37</h1></div>
                            </div>

                            <div className={style["box-salvar"]}>
                                {<Botao nome={"Salvar"} cor={"#C66D2C"} />}
                            </div>
                        </div>
                    </div>
                </div>

            </Alignner>
        </>
    );
};

export default OrdemServico;