import React, { useEffect, useState } from 'react';
import styles from './Configuracoes.module.css';
import NavBar from '../../components/navbar/NavBar';
import botaoEditar from "./../../utils/assets/botao-editar.svg";
import marcos from "./../../utils/assets/marcos.svg";
import Input from '../../components/input/Input';
import imgBuscar from "./../../utils/assets/logo buscar colorido.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';
import iconSave from "./../../utils/assets/icon-save.png";
import { inputMascaraCPF_CNPJ, inputMascaraCep, inputMascaraTelefoneCelular } from "./../../utils/global";
import api, { retornaCep } from '../../services/api';
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";

function Configuracoes() {
    const [idGerente, setIdGerente] = useState(0);
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
    const [buscar, setBuscar] = useState(false);

    let imgGerente = atob(sessionStorage.getItem("imgGerente")) != "" ? atob(sessionStorage.getItem("imgGerente")) : marcos;

    var regex = /[^\w\s]/gi;

    var tamanhoFundo = "100%";

    function handleValores(endereco) {
        setLogradouro(endereco.logradouro);
        setCidade(endereco.localidade);
        setBairro(endereco.bairro);
        setComplemento(endereco.complemento);
        setEstado(endereco.uf);
        setCep(endereco.cep);
    }

    function getConfig() {
        api.get(`/gerentes`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].email === sessionStorage.getItem("email")) {
                    setIdGerente(response.data[i].id);
                    setNome(response.data[i].nome);
                    setSobrenome(response.data[i].sobrenome);
                    setTelefone(response.data[i].oficina.informacoesOficina.whatsapp);
                    setEmail(response.data[i].username);
                    setStatus(response.data[i].enabled ? "Ativo" : "Inativo");
                    setNomeEmpresa(response.data[i].oficina.nome);
                    setCnpj(response.data[i].oficina.cnpj);
                    setCep(response.data[i].oficina.cep);
                    setNumero(response.data[i].oficina.numero);
                    setComplemento(response.data[i].oficina.complemento);
                    setBuscar(response.data[i].oficina.hasBuscar);
                    retornaCep(response.data[i].oficina.cep).then((endereco) => {
                        setCep(endereco.data.cep);
                        setBairro(endereco.data.bairro);
                        setLogradouro(endereco.data.logradouro);
                        setCidade(endereco.data.localidade);
                        setEstado(endereco.data.uf);
                        setComplemento(endereco.data.complemento);
                    }).catch((error) => {
                        console.log("Erro ao buscar CEP: ", error);
                    });
                }
            }
        }).catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    function verificarCampos() {
        if (nome === "" || sobrenome === "" || telefone === "" || email === "" || status === "" || nomeEmpresa === "" || cnpj === "" || cep === "" || numero === "") {
            toast.error("Preencha todos os campos!");
            return false;
        } else if (cep.length < 9 || bairro === "" || cidade === "" || estado === "" || logradouro === "") {
            toast.error("CEP inválido!");
            return false;
        }
        return true;
    }

    function salvarConfig() {
        if (verificarCampos()) {
            api.put(`/gerentes/${idGerente}`, {
                nome: nome,
                sobrenome: sobrenome
            }).then(() => {
                if (senha !== "") {
                    api.put(`/gerentes/atualiza-senha/${idGerente}`, {
                        senha: senha
                    }).then(() => {
                        salvarOficina();
                    }).catch((error) => {
                        console.log("Erro ao salvar senha: ", error);
                    });
                } else {
                    salvarOficina();
                }
            }).catch((error) => {
                console.log("Erro ao salvar nome do Gerente: ", error);
            });
        }
    }

    function salvarOficina() {
        api.put(`/oficinas/${sessionStorage.getItem("idOficina")}`, {
            nome: nomeEmpresa,
            cep: cep,
            numero: numero,
            complemento: complemento,
            hasBuscar: buscar
        }).then(() => {
            console.log(numero)
            api.put(`/infos-oficina/atualiza-zap/${sessionStorage.getItem("idOficina")}`, {
                whatsapp: telefone
            }).then(() => {
                toast.success("Configurações salvas com sucesso!");
            }).catch((error) => {
                console.log("Erro ao salvar telefone: ", error);
            });
        }).catch((error) => {
            console.log("Erro ao salvar configurações: ", error);
        });
    }

    const supabaseUrl = "https://jeyoqssrkcibrvhoobsk.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleW9xc3Nya2NpYnJ2aG9vYnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MzYzOTMsImV4cCI6MjAyOTExMjM5M30.laseDYQK0WEdEY764voRE3nZMOqwqMth2mdVyJHO4wU";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileChange = (e) => {
    uploadImage(e.target.files[0]);
  };

  async function uploadImage(file) {
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const filePath = `fotosGerente/${Date.now() + fileName}.png`;
    const { error } = await supabase.storage
      .from("ofc-photos")
      .upload(filePath, file);
    if (error) {
      toast.error("Erro ao atualizar imagem " + error.message);
      return;
    }

    const publicUrl = supabase.storage.from("ofc-photos").getPublicUrl(filePath)
      .data.publicUrl;

    await api
      .put(`/gerentes/atualiza-foto/${idGerente}`, {
        url: publicUrl,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem('imgGerente',btoa(publicUrl));
        toast.success(
          "Imagem alterada com sucesso, atualizando em 2 segundos",
          {
            autoClose: 1900,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        console.error("Erro ao atualizar imagem: " + e);
        toast.error("Erro ao atualizar imagem!" + e);
      });
  }

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <div>
            <div>
                <NavBar currentPage={"configuracoes"} />
            </div>
            <div className={styles["container"]}>
                <MenuConfig ativo={1} />
                <div className={styles["info-principal"]}>
                    <div className={styles["botao-editar"]}><a onClick={salvarConfig}><img src={iconSave} alt="Imagem Editar" /></a></div>
                    <div className={styles["imagem-perfil"]} onClick={() => document.getElementById("ipt_foto_gerente").click()}>
                        <input style={{display:'none'}} type="file" name="" id="ipt_foto_gerente" onChange={handleFileChange} />
                        <img src={imgGerente} alt="Imagem do Usuário" />
                        </div>
                    <h1>{nome + " " + sobrenome}</h1>
                    <div className={styles["linhas"]}>
                        <div className={styles["linha"]} style={{ justifyContent: "space-between" }}>
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                        </div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} maxLength={14} onInput={inputMascaraTelefoneCelular} nome="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} /></div>
                        <div className={styles["linha"]}><Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                        <div className={styles["linha"]}>
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={tamanhoFundo} nome="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={styles["info-secundario"]}>
                    <div className={styles["config-editar"]}><a onClick={salvarConfig}><img src={iconSave} alt="Botão de Editar" /></a></div>
                    <div><h1>{nomeEmpresa}</h1></div>
                    <div className={styles["linhas"]} style={{ marginTop: "5vh" }}>
                        <div className={styles["linha"]}>
                            <Input nome={"Nome"} tamanho={"100%"} tamanhoFundo={tamanhoFundo} value={nomeEmpresa} onChange={(e) => setNomeEmpresa(e.target.value)} />
                            <Input nome={"CNPJ"} disabled tamanho={"100%"} tamanhoFundo={tamanhoFundo} value={cnpj} onInput={inputMascaraCPF_CNPJ} onChange={(e) => setCnpj(e.target.value)} maxLength={18} />
                        </div>
                        <div className={styles["linha"]}><Input nome={"CEP"} tamanho={"40%"} tamanhoFundo={tamanhoFundo} value={cep} onInput={(e) => inputMascaraCep(e, handleValores)} onChange={(e) => setCep(e.target.value.replace(regex, ""))} maxLength={9} /></div>
                        <div className={styles["linha"]}>
                            <Input nome={"Logradouro"} tamanho={"100%"} tamanhoFundo={"100%"} value={logradouro} onChange={(e) => setLogradouro(e.target.value)} disabled={true} />
                            <Input nome={"N°"} tamanho={"100%"} tamanhoFundo={"30%"} value={numero} onChange={(e) => setNumero(e.target.value)} />
                            <Input nome={"Complemento"} tamanho={"100%"} tamanhoFundo={"40%"} value={complemento} onChange={(e) => setComplemento(e.target.value)} disabled={true} />
                        </div>
                        <div className={styles["linha"]}>
                            <Input nome={"Bairro"} tamanho={"100%"} tamanhoFundo={"100%"} value={bairro} onChange={(e) => setBairro(e.target.value)} disabled={true} />
                            <Input nome={"Cidade"} tamanho={"100%"} tamanhoFundo={"60%"} value={cidade} onChange={(e) => setCidade(e.target.value)} disabled={true} />
                            <Input nome={"Estado"} tamanho={"100%"} tamanhoFundo={"30%"} value={estado} onChange={(e) => setEstado(e.target.value)} disabled={true} />
                        </div>
                        <div className={styles["botao-buscar"]}>
                            <img src={imgBuscar} alt="Imagem do Buscar" />
                            <input type="checkbox" checked={buscar} onChange={(e) => setBuscar(e.target.value)} name="buscar-check" id="check" className={styles["buscar-check"]} />
                            <label htmlFor="check" className={styles["button-check"]}></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configuracoes;