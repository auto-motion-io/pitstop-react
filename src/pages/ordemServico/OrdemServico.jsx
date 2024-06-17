import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import style from "./OrdemServico.module.css";
import lupa from "../../utils/assets/lupa.svg";
import botaoAdicionar from "../../utils/assets/botao-add-laranja.svg";
import Botao from "../../components/botao/Botao";
import api from "../../services/api";
import { regexPlacas } from "../../utils/global"
import lupaImg from "./../../utils/assets/lupa.svg";


const OrdemServico = () => {
    
    const corInput = "#ECEAE5";

    //#region Variáveis Cliente
    
    const [idCliente, setIdCliente] = useState([]);
    const [nomeCliente, setNomeCliente] = useState([]);
    const [nomeClienteSelecionado, setNomeClienteSelecionado] = useState("");
    const [infoCliente, setInfoCliente] = useState([]);
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [emailCliente, setEmailCliente] = useState("");
    const nomeClienteRef = useRef(null);
    const nomeClienteLupaRef = useRef(null);

    //#endregion

    //#region Variáveis Veículo

    const [placa, setPlaca] = useState([]);
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [cor, setCor] = useState("");
    const [ano, setAno] = useState("");
    const [idVeiculo, setIdVeiculo] = useState();
    const [infoVeiculo, setInfoVeiculo] = useState([]);
    const [placaSelecionada, setPlacaSelecionada] = useState("");
    const placaRef = useRef(null);
    const placaLupaRef = useRef(null);

    //#endregion

    //#region Váriaveis Produtos

    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState("");
    const [qtdProduto, setQtdProduto] = useState("");
    const [garantiaProduto, setGarantiaProduto] = useState("");
    const [valorTotalProduto, setValorTotalProduto] = useState("");

    //#endregion

    const [status, setStatus] = useState("Em aberto");
    const [garantia, setGarantia] = useState("");
    const [token, setToken] = useState("");
    const [idMecanico, setIdMecanico] = useState();
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [tipoOs, setTipoOs] = useState();
    const [nomeMecanico, setNomeMecanico] = useState("");
    const [telMecanico, setTelMecanico] = useState("");
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [observacoes, setObservacoes] = useState();

    const [opcoesDropdown, setOpcoesDropdown] = useState([]);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

    const [produtos, setProdutos] = useState([
        {
            nome: "",
            valorUnidade: "",
            quantidade: "",
            garantia: "",
            valorTotal: ""
        }
    ]);
    const [servicos, setServicos] = useState([
        {
            nome: "",
            valor: ""
        }
    ]);

    const changeBorderRadius = (valor, valorLupa, ref, refLupa) => {
        ref.current.style.borderRadius = valor;
        refLupa.current.style.borderRadius = valorLupa;
    }

    function mostrarOpcoesDropdown(dropdown, retorno, ref, refLupa, opcaoSelecionada = "") {
        setOpcaoSelecionada(opcaoSelecionada);
        if (dropdown) {
            changeBorderRadius("0 3vh 0vh 0", "3vh 0 0 0", ref, refLupa);
        } else {
            changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", ref, refLupa);
        }
        setOpcoesDropdown(retorno);
        setMostrarDropdown(dropdown);
    }

    const adicionarProduto = () => {
        setProdutos((prevProdutos) => [
            ...prevProdutos,
            {
                nome: "",
                valorUnidade: "",
                quantidade: "",
                garantia: "",
                valorTotal: ""
            }
        ]);
    };

    const excluirProduto = () => {
        if (produtos.length > 1) {
            setProdutos((prevProdutos) => prevProdutos.slice(0, -1));
        }
    };

    const adicionarServico = () => {
        setServicos((prevServicos) => [
            ...prevServicos,
            {
                nome: "",
                valor: ""
            }
        ]);
    };

    const excluirServico = () => {
        if (servicos.length > 1) {
            setServicos((prevServicos) => prevServicos.slice(0, -1));
        }
    };

    //#region Cliente

    function buscarCliente() {
        api.get(`/clientes/oficina/${sessionStorage.getItem("idOficina")}`).then((response) => {
            let infoCliente = [];
            let nomeCliente = [];
            for (let i = 0; i < response.data.length; i++) {
                infoCliente.push(response.data[i]);
                nomeCliente.push(response.data[i].nome);
            }
            setInfoCliente(infoCliente);
            setNomeCliente(nomeCliente);
        }).catch((error) => {
            console.error("Erro ao buscar o cliente:", error);
        });
    }

    function buscarInfoCliente(){
        for (let i = 0; i < nomeCliente.length; i++) {
            if (nomeCliente[i] === nomeClienteSelecionado) {
                setIdCliente(infoCliente[i].id);
                setTelefoneCliente(infoCliente[i].telefone);
                setEmailCliente(infoCliente[i].email);
                break;
            }
        }
    }

    function addCliente(select) {
        if (select !== "") {
            setNomeClienteSelecionado(select.target.innerText);
        }
    }

    useEffect(() => {
        buscarInfoCliente();
    }, [nomeClienteSelecionado]);

    //#endregion

    //#region Veículo

    function buscarVeiculo() {
        console.log(idCliente); 
        api.get(`/veiculos/buscar-por-cliente/${idCliente}`).then((response) => {
            let infoVeiculo = [];
            let placaVeiculo = [];
            for (let i = 0; i < response.data.length; i++) {
                infoVeiculo.push(response.data[i]);
                placaVeiculo.push(response.data[i].placa);
            }
            console.log(infoVeiculo);
            console.log(placaVeiculo);
            setInfoVeiculo(infoVeiculo);
            setPlaca(placaVeiculo);
        }).catch((error) => {
            console.warn("Veículo não encontrado, continuar irá cadastrar um novo veículo.")
        });
    }

    function buscarInfoVeiculo() {
        for (let i = 0; i < placa.length; i++) {
            if (placa[i] === placaSelecionada) {
                setIdVeiculo(infoVeiculo[i].id);
                setMarca(infoVeiculo[i].marca);
                setModelo(infoVeiculo[i].modelo);
                setCor(infoVeiculo[i].cor);
                setAno(infoVeiculo[i].anoFabricacao);
                break;
            }
        }
    }

    function addVeiculo(e, select) {
        if (e.key === "Enter") {
            setPlacaSelecionada(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";
                setMostrarDropdown(false);
                return novoArray;
            });
        }
        else if (select !== "") {
            setPlacaSelecionada(select);
        }
    }

    const mascaraPlaca = (e) => {
        let placaDigitada = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        
        if (placaDigitada.length > 3) {
            placaDigitada = placaDigitada.replace(/([A-Z]{3})([0-9]{1,4})/, '$1-$2');
        }

        setPlacaSelecionada(placaDigitada);
    };

    function existeVeiculo() {
        api.get(`/veiculos`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].placa === placaSelecionada) {
                    return true;
                }
            }
            return false;
        }).catch((error) => {
            console.error("Erro ao buscar veículos", error);
        });
    }
    

    useEffect(() => {
        buscarInfoVeiculo();
    }, [placaSelecionada]);

    useEffect(() => {
        if(idCliente !== ""){
            buscarVeiculo();
        }
    }, [idCliente]);

    //#endregion
    
    function salvarOS() {
        if(existeVeiculo()){
            api.post("/ordemDeServicos", {
                idCliente: idCliente,
                idVeiculo: idVeiculo,
                idMecanico: idMecanico,
                status: status,
                garantia: garantia,
                token: token,
                dataInicio: dataInicio,
                dataFim: dataFim,
                tipoOs: tipoOs,
                produtos: produtos,
                servicos: servicos,
                observacoes: observacoes
            }).then((response) => {
                console.log("Ordem de serviço cadastrada com sucesso", response);
            }).catch((error) => {
                console.error("Erro ao cadastrar ordem de serviço", error);
            });
        } else{
            api.post("/veiculos", {
                fkCliente: idCliente,
                placa: placaSelecionada,
                marca: marca,
                modelo: modelo,
                cor: cor,
                anoFabricacao: ano
            }).then((response) => {
                console.log("Veículo cadastrado com sucesso", response);
                setIdVeiculo(response.data.id);
                salvarOS();
            }).catch((error) => {
                console.error("Erro ao cadastrar veículo", error);
            });
        }
    }


    useEffect(() => {
        buscarCliente();
    });

    return (
        <>
            <div>
                <NavBar currentPage={"os"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Ordens" resposta={["Cliente", "Status", "Ações"]} tamanho="28vw" hasInput={false} ordem={true} endpoint={"/ordemDeServicos"} />
                <div className={style["box"]}>
                    <h1>Nova</h1>
                    <div className={style["container"]}>
                        <div className={style["box-container"]}>
                            <div className={style["box-header"]}>
                                <h1>#2559</h1>
                                <div className={style["box-header-inputs"]}>
                                    <Input value={status} onChange={(e) => setStatus(e.target.value)} nome={"Status"} tamanho={"8vw"} corBackground={corInput} />
                                    <Input value={garantia} onChange={(e) => setGarantia(e.target.value)} nome={"Garantia"} tamanho={"8vw"} corBackground={corInput} />
                                    <h2><b>Token</b><br />E0BZZ</h2>
                                </div>
                            </div>
                            <div className={style["box-cliente"]}>
                                <h1>Cliente</h1>
                                <span className={style["input-label"]}>Nome*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]} ref={nomeClienteLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={nomeClienteSelecionado} ref={nomeClienteRef} onFocus={() => mostrarOpcoesDropdown(true, nomeCliente, nomeClienteRef, nomeClienteLupaRef, "NomeCliente")} onBlur={() => mostrarOpcoesDropdown(false, "", nomeClienteRef, nomeClienteLupaRef, "")} onChange={(e) => setNomeClienteSelecionado(e.target.value)} style={{width: "18.1vw"}} />
                                </div>
                                {mostrarDropdown && opcaoSelecionada === "NomeCliente" && (
                                    <div className={style["dropdown"]} style={{height: nomeCliente.length < 5 ? "fit-content" : "20vw", width: "20vw"}}>
                                        {opcoesDropdown.map((cliente, index) => (
                                            <div key={index} className={style["opcao-dropdown"]} onMouseDown={(e) => addCliente(e, cliente)}>
                                                {cliente}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Telefone*"} value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"E-mail*"} value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                            </div>
                            <div className={style["box-veiculo"]}>
                                <h1>Veículo</h1>
                                <span className={style["input-label"]}>Placa*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]} ref={placaLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={placaSelecionada} ref={placaRef} onFocus={() => mostrarOpcoesDropdown(true, placa, placaRef, placaLupaRef, "Placa")} onBlur={() => mostrarOpcoesDropdown(false, "", placaRef, placaLupaRef, "")} maxLength={8} onChange={mascaraPlaca} style={{width: "18.1vw"}} onKeyDown={(e) => addVeiculo(e)}/>
                                </div>
                                {mostrarDropdown && opcaoSelecionada === "Placa" && (
                                    <div className={style["dropdown"]} style={{height: placa.length < 5 ? "fit-content" : "20vw", width: "20vw"}}>
                                        {opcoesDropdown.map((placa, index) => (
                                            <div key={index} className={style["opcao-dropdown"]} onMouseDown={(e) => addVeiculo(e, placa)}>
                                                {placa}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={style["box-veiculo-inputs"]}>
                                    <Input nome={"Marca*"} value={marca} onChange={(e) => setMarca(e.target.value)} tamanho={"15vw"} corBackground={corInput} />
                                    <Input nome={"Modelo*"} value={modelo} onChange={(e) => setModelo(e.target.value)} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Ano*"} value={ano} onChange={(e) => setAno(e.target.value)} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Cor*"} value={cor} onChange={(e) => setCor(e.target.value)} tamanho={"12vw"} corBackground={corInput} />
                                </div>
                            </div>
                            <div className={style["box-responsavel"]}>
                                <h1>Responsável</h1>
                                <div className={style["responsavel-inputs"]}>
                                    <Input nome={"Nome*"} value={nomeMecanico} onChange={(e) => setNomeMecanico(e.target.value)} imagem={lupa} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"100%"} />
                                    <Input nome={"Telefone*"} value={telMecanico} onChange={(e) => setTelMecanico(e.target.value)} imagem={lupa} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"100%"} />
                                </div>
                            </div>

                            <div className={style["box-prazo-cliente"]}>
                                <div className={style["tema-prazos"]}>
                                    <h1>Prazos</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <Input nome={"Inicio*"} value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                        <Input nome={"Previsão de Término*"} value={dataFim} onChange={(e) => setDataFim(e.target.value)} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    </div>
                                </div>
                                <div className={style["tema-classificacao"]}>
                                    <h1>Classificação</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <Input nome={"Tipo de OS*"} value={tipoOs} onChange={(e) => setTipoOs(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    </div>
                                </div>
                            </div>

                            <div className={style["box-produtos"]}>
                                <div className={style["titulo-com-excluir"]}>
                                    <div className={style["titulo-desfazer"]}>
                                        <h1>Produtos</h1>
                                        {produtos.length > 1 && (
                                            <a onClick={excluirProduto} className={style["btn-excluir"]}>
                                                Desfazer
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {produtos.map((produto, index) => (
                                    <div key={index} className={style["box-cliente-inputs"]}>
                                        <Input nome={"Nome*"} value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)} imagem={lupa} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"100%"} />
                                        <Input nome={"Valor Unidade*"} value={valorProduto} onChange={(e) => setValorProduto(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Quantidade*"} value={qtdProduto} onChange={(e) => setQtdProduto(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Garantia*"} value={garantiaProduto} onChange={(e) => setGarantiaProduto(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Valor Total*"} value={valorTotalProduto} onChange={(e) => setValorTotalProduto(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    </div>
                                ))}
                                <div className={style["box-add"]}>
                                    <a onClick={adicionarProduto}><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-servicos"]}>
                                <div className={style["titulo-com-excluir"]}>
                                    <div className={style["titulo-desfazer"]}>
                                        <h1>Serviços</h1>
                                        {servicos.length > 1 && (
                                            <a onClick={excluirServico} className={style["btn-excluir"]}>
                                                Desfazer
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {servicos.map((servico, index) => (
                                    <div key={index} className={style["box-servicos-inputs"]}>
                                        <Input nome={"Nome*"} value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} imagem={lupa} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"100%"} />
                                        <Input nome={"Valor*"} value={valorServico} onChange={(e) => setValorServico(e.target.value)} corBackground={corInput} tamanho={"50%"} tamanhoFundo={"100%"} />
                                    </div>
                                ))}
                                <div className={style["box-add"]}>
                                    <a onClick={adicionarServico}><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-observacoes"]}>
                                <h1>Observações</h1>
                                <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} name="" id=""></textarea>
                            </div>

                            <div className={style["box-valor"]}>
                                <div className={style["titulo"]}><h1>Valor Total</h1></div>
                                <div className={style["valor"]}><h1>R$1566,37</h1></div>
                            </div>

                            <div className={style["box-salvar"]}>
                                {<Botao nome={"Salvar"} onClick={buscarCliente} cor={"#C66D2C"} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Alignner>
        </>
    );
};

export default OrdemServico;
