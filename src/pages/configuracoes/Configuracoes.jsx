import React from 'react';
import styles from './Configuracoes.module.css';
import NavBar from '../../components/navbar/NavBar';
import pneuConfig from "./../../utils/assets/pneu-config.svg";
import engrenagemConfig from "./../../utils/assets/engrenagem-lupa.svg";
import botaoEditar from "./../../utils/assets/botao-editar.svg";
import marcos from "./../../utils/assets/marcos.svg";
import Input from '../../components/input/Input';
import imgBuscar from "./../../utils/assets/logo buscar colorido.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';

function Configuracoes() {
    var tamanhoFundo = "100%";
    return (
        <div>
            <div>
                <NavBar currentPage={"configuracoes"}/>
            </div>
            <div className={styles["container"]}>
                <MenuConfig ativo={1}/>
                <div className={styles["info-principal"]}>
                    <div className={styles["botao-editar"]}><a><img src={botaoEditar} alt="Imagem Editar" /></a></div>
                    <div className={styles["imagem-perfil"]}><img src={marcos} alt="Imagem do Usuário" /></div>
                    <h1>Marcos Gonzales</h1>
                    <div className={styles["linhas"]}>
                        <div className={styles["linha"]} style={{ justifyContent: "space-between" }}>
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Nome" />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Sobrenome" />
                        </div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Telefone" /></div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="E-mail" /></div>
                        <div className={styles["linha"]}>
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Senha" />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Status" />
                        </div>
                    </div>
                </div>
                <div className={styles["info-secundario"]}>
                    <div className={styles["config-editar"]}><a><img src={botaoEditar} alt="Botão de Editar" /></a></div>
                    <div><h1>Auto Milton</h1></div>
                    <div className={styles["linhas"]} style={{marginTop: "5vh"}}>
                        <div className={styles["linha"]}>
                            <Input nome={"Nome"} tamanho={"100%"} tamanhoFundo={tamanhoFundo}/>
                            <Input nome={"CNPJ"} tamanho={"100%"} tamanhoFundo={tamanhoFundo} />
                        </div>
                        <div className={styles["linha"]}><Input nome={"CEP"} tamanho={"40%"} tamanhoFundo={tamanhoFundo} /></div>
                        <div className={styles["linha"]}>
                            <Input nome={"Logradouro"} tamanho={"100%"} tamanhoFundo={"100%"}/>
                            <Input nome={"N°"} tamanho={"100%"} tamanhoFundo={"30%"} />
                            <Input nome={"Complemento"} tamanho={"100%"} tamanhoFundo={"40%"} />
                        </div>
                        <div className={styles["linha"]}>
                            <Input nome={"Bairro"} tamanho={"100%"} tamanhoFundo={"100%"}/>
                            <Input nome={"Cidade"} tamanho={"100%"} tamanhoFundo={"60%"} />
                            <Input nome={"Estado"} tamanho={"100%"} tamanhoFundo={"30%"} />
                        </div>
                        <div className={styles["botao-buscar"]}>
                            <img src={imgBuscar} alt="Imagem do Buscar" />
                            <input type="checkbox" name="buscar-check" id="check" className={styles["buscar-check"]} />
                            <label for="check" className={styles["button-check"]}></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuracoes;