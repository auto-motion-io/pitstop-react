import React, { useState } from 'react';
import styles from './Configuracoes.module.css';
import NavBar from '../../components/navbar/NavBar';
import botaoEditar from "./../../utils/assets/botao-editar.svg";
import marcos from "./../../utils/assets/marcos.svg";
import Input from '../../components/input/Input';
import imgBuscar from "./../../utils/assets/logo buscar colorido.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';
import { inputMascaraCPF_CNPJ, inputMascaraTelefoneCelular } from "./../../utils/global";


function Configuracoes() {
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [status, setStatus] = useState("");
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

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
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                        </div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} maxLength={15} onInput={inputMascaraTelefoneCelular} nome="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} /></div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className={styles["linha"]}>
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={styles["info-secundario"]}>
                    <div className={styles["config-editar"]}><a><img src={botaoEditar} alt="Botão de Editar" /></a></div>
                    <div><h1>Auto Milton</h1></div>
                    <div className={styles["linhas"]} style={{marginTop: "5vh"}}>
                        <div className={styles["linha"]}>
                            <Input nome={"Nome"} tamanho={"100%"} tamanhoFundo={tamanhoFundo} value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />
                            <Input nome={"CNPJ"} tamanho={"100%"} tamanhoFundo={tamanhoFundo} value={cnpj} onInput={inputMascaraCPF_CNPJ} onChange={(e) => setCnpj(e.target.value)} />
                        </div>
                        <div className={styles["linha"]}><Input nome={"CEP"} tamanho={"40%"} tamanhoFundo={tamanhoFundo} value={cep} onChange={(e) => setCep(e.target.value)} /></div>
                        <div className={styles["linha"]}>
                            <Input nome={"Logradouro"} tamanho={"100%"} tamanhoFundo={"100%"} value={logradouro} onChange={(e) => setLogradouro(e.target.value)} />
                            <Input nome={"N°"} tamanho={"100%"} tamanhoFundo={"30%"} value={numero} onChange={(e) => setNumero(e.target.value)} />
                            <Input nome={"Complemento"} tamanho={"100%"} tamanhoFundo={"40%"} value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                        </div>
                        <div className={styles["linha"]}>
                            <Input nome={"Bairro"} tamanho={"100%"} tamanhoFundo={"100%"} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            <Input nome={"Cidade"} tamanho={"100%"} tamanhoFundo={"60%"} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            <Input nome={"Estado"} tamanho={"100%"} tamanhoFundo={"30%"} value={estado} onChange={(e) => setEstado(e.target.value)} />
                        </div>
                        <div className={styles["botao-buscar"]}>
                            <img src={imgBuscar} alt="Imagem do Buscar" />
                            <input type="checkbox" name="buscar-check" id="check" className={styles["buscar-check"]} />
                            <label htmlFor="check" className={styles["button-check"]}></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuracoes;