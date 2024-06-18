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
import { inputMascaraTelefoneCelular, regexPlacas, tiposDeOs } from "../../utils/global"
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
    const [valorUnidadeAtual, setValorUnidadeAtual] = useState([]);
    const [qtdProdutoAtual, setQtdProdutoAtual] = useState([]);
    const [garantiaProdutoAtual, setGarantiaProdutoAtual] = useState([]);
    const [valorTotalProdutoAtual, setValorTotalProdutoAtual] = useState([]);
    const produtoRef = useRef([]);
    const produtoLupaRef = useRef([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState("");
    const [infoProdutos, setInfoProdutos] = useState([]);
    const [nomeProdutos, setNomeProdutos] = useState([]);
    const [produtosLista, setProdutosLista] = useState([
        {
            nome: "",
            valorUnidade: "",
            quantidade: "",
            garantia: "",
            valorTotal: ""
        }
    ]);
    //#endregion

    //#region Váriaveis Mecânico
    const [idMecanico, setIdMecanico] = useState();
    const [nomeMecanico, setNomeMecanico] = useState([]);
    const [telMecanico, setTelMecanico] = useState("");
    const [mecanicoSelecionado, setMecanicoSelecionado] = useState("");
    const [infoMecanico, setInfoMecanico] = useState([]);
    const mecanicoRef = useRef(null);
    const mecanicoLupaRef = useRef(null);
    //#endregion

    //#region Váriaveis Ordem de Serviço
    const tipoOsRef = useRef(null);
    const tipoOsLupaRef = useRef(null);
    const [tipoOs, setTipoOs] = useState();
    const [tipoOsSelecionada, setTipoOsSelecionada] = useState("");
    //#endregion

    //#region Váriaveis Serviços
    const servicoRef = useRef([]);
    const servicoLupaRef = useRef([]);
    const [nomeServicos, setNomeServicos] = useState([]);
    const [servicoSelecionado, setServicoSelecionado] = useState("");
    const [valorServico, setValorServico] = useState([]);
    const [garantiaServico, setGarantiaServico] = useState([]);
    const [infoServicos, setInfoServicos] = useState([]);
    const [servicosLista, setServicosLista] = useState([
        {
            nome: "",
            valor: ""
        }
    ]);
    //#endregion

    const [status, setStatus] = useState("Em aberto");
    const [garantia, setGarantia] = useState("");
    const [token, setToken] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [observacoes, setObservacoes] = useState();
    const [valorTotal, setValorTotal] = useState(0);

    const [opcoesDropdown, setOpcoesDropdown] = useState([]);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

    

    

    const changeBorderRadius = (valor, valorLupa, ref, refLupa) => {
        ref.current.style.borderRadius = valor;
        if (refLupa !== null) {
            refLupa.current.style.borderRadius = valorLupa;
        }
    }

    function mostrarOpcoesDropdown(dropdown, retorno, ref, refLupa, opcaoSelecionada = "") {
        setOpcaoSelecionada(opcaoSelecionada);
        if (dropdown) {
            changeBorderRadius("0 3vh 0vh 0", "3vh 0 0 0", ref, refLupa);
        } else if (!dropdown) {
            changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", ref, refLupa);
        } else if (dropdown && refLupa === null) {
            changeBorderRadius("5vh", "3vh 0 0 0", ref, refLupa);
        } else if (!dropdown && refLupa === null) {
            changeBorderRadius("5vh", "3vh 0 0 3vh", ref, refLupa);
        }
        setOpcoesDropdown(retorno);
        setMostrarDropdown(dropdown);
    }

    const adicionarServicoLista = () => {
        setServicosLista((prevServicos) => [
            ...prevServicos,
            {
                nome: "",
                valor: ""
            }
        ]);
    };

    const excluirServico = () => {
        if (servicosLista.length > 1) {
            setServicosLista((prevServicos) => prevServicos.slice(0, -1));
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

    function buscarInfoCliente() {
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

    useEffect(() => {
        buscarCliente();
    });

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
            setPlacaSelecionada(e.target.value);
            setMostrarDropdown(false);
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
        if (idCliente !== "") {
            buscarVeiculo();
        }
    }, [idCliente]);

    //#endregion

    //#region Mecânico

    function buscarMecanico() {
        api.get(`/mecanicos/oficina/${sessionStorage.getItem("idOficina")}`).then((response) => {
            let nomeMecanico = [];
            let infoMecanico = [];
            for (let i = 0; i < response.data.length; i++) {
                nomeMecanico.push(response.data[i].nome);
                infoMecanico.push(response.data[i]);
            }
            setInfoMecanico(infoMecanico);
            setNomeMecanico(nomeMecanico);
        }).catch((error) => {
            console.error("Erro ao buscar mecânicos", error);
        });
    }

    function buscarInfoMecanico() {
        for (let i = 0; i < nomeMecanico.length; i++) {
            if (nomeMecanico[i] === mecanicoSelecionado) {
                setIdMecanico(infoMecanico[i].id);
                setTelMecanico(infoMecanico[i].telefone);
                break;
            }
        }
    }

    function addMecanico(e, select) {
        if (e.key === "Enter") {
            setMecanicoSelecionado(e.target.value);
            setMostrarDropdown(false);
        } else if (select !== "") {
            setMecanicoSelecionado(select);
            for (let i = 0; i < infoMecanico.length; i++) {
                if (infoMecanico[i].nome === select) {
                    setTelMecanico(infoMecanico[i].telefone);
                    break;
                }
            }
        }
    }

    useEffect(() => {
        buscarInfoMecanico();
    }, [mecanicoSelecionado]);

    useEffect(() => {
        buscarMecanico();
    }, []);

    //#endregion

    //#region Ordem de Serviço

    function addTipoOs(e, select) {
        if (e.key === "Enter") {
            setTipoOs(e.target.value);
            setMostrarDropdown(false);
        } else if (select !== "") {
            setTipoOs(select);
        }
    }

    function salvarOS() {
        if (existeVeiculo()) {
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
                produtos: "",
                servicos: "",
                observacoes: observacoes
            }).then((response) => {
                console.log("Ordem de serviço cadastrada com sucesso", response);
            }).catch((error) => {
                console.error("Erro ao cadastrar ordem de serviço", error);
            });
        } else {
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

    //#endregion

    //#region Produtos

    function buscarProdutos() {
        api.get(`/produtoEstoque/oficina/${sessionStorage.getItem("idOficina")}`).then((response) => {
            let infoProdutos = [];
            let nomeProdutos = [];
            for (let i = 0; i < response.data.length; i++) {
                infoProdutos.push(response.data[i]);
                nomeProdutos.push(response.data[i].nome);
            }
            setNomeProdutos(nomeProdutos);
            setInfoProdutos(infoProdutos);
        }).catch((error) => {
            console.error("Erro ao buscar produtos", error);
        });
    }

    function addProduto(e, select, indexOption, index) {
        if (e.key === "Enter") {
            setProdutoSelecionado(e.target.value);
            setMostrarDropdown(false);
        } else if (select !== "") {
            const novosProdutosSelecionados = [...produtoSelecionado];
            novosProdutosSelecionados[index] = select;
            setProdutoSelecionado(novosProdutosSelecionados);

            const novoValorUnidade = [...valorUnidadeAtual];
            novoValorUnidade[index] = infoProdutos[indexOption].valorVenda;
            setValorUnidadeAtual(novoValorUnidade);

            const novoValorGarantia = [...garantiaProdutoAtual];
            novoValorGarantia[index] = infoProdutos[indexOption].garantia;
            setGarantiaProdutoAtual(novoValorGarantia);
        }
    }

    function calcularValorTotalProduto(index) {
        const novoValorTotalProduto = [...valorTotalProdutoAtual];
        novoValorTotalProduto[index] = qtdProdutoAtual[index] * valorUnidadeAtual[index];
        setValorTotalProdutoAtual(novoValorTotalProduto);
    }

    function setarQtdAtual(e, index) {
        const novoQtd = [...qtdProdutoAtual];
        novoQtd[index] = e.target.value;
        setQtdProdutoAtual(novoQtd);
    }   

    const adicionarProdutoLista = () => {
        setProdutosLista((prevProdutos) => [
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
        if (produtosLista.length > 1) {
            setProdutosLista((prevProdutos) => prevProdutos.slice(0, -1));
        }
    };

    useEffect(() => {
        buscarProdutos();
    }, []);

    //#endregion

    //#region Serviços

    function buscarServicos() {
        api.get(`/servicos/oficina/${sessionStorage.getItem("idOficina")}`).then((response) => {
            let nomeServicos = [];
            let infoServicos = [];
            for (let i = 0; i < response.data.length; i++) {
                nomeServicos.push(response.data[i].nome);
                infoServicos.push(response.data[i]);
            }
            setNomeServicos(nomeServicos);
            setInfoServicos(infoServicos);
        }).catch((error) => {
            console.error("Erro ao buscar serviços", error);
        });
    }

    function addServico(e, select, indexOption, index) {
        if (e.key === "Enter") {
            setProdutoSelecionado(e.target.value);
            setMostrarDropdown(false);
        } else if (select !== "") {
            const novosServicosSelecionados = [...servicoSelecionado];
            novosServicosSelecionados[index] = select;
            setServicoSelecionado(novosServicosSelecionados);

            const novoValorServico = [...valorServico];
            novoValorServico[index] = infoServicos[indexOption].valorServico;
            setValorServico(novoValorServico);

            const novoGarantiaServico = [...garantiaServico];
            novoGarantiaServico[index] = infoServicos[indexOption].garantia;
            setGarantiaServico(novoGarantiaServico);

            calcularValorTotal(novoValorServico);
        }
    }

    useEffect(() => {
        buscarServicos();
    }, []);

    function calcularValorTotal(produto, servico) {
        let total = 0;
        for (let i = 0; i < produto.length; i++) {
            total += valorTotalProdutoAtual[i];
        }
        setValorTotal(total);
    }

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
                                    <input type="text" value={nomeClienteSelecionado} ref={nomeClienteRef} onFocus={() => mostrarOpcoesDropdown(true, nomeCliente, nomeClienteRef, nomeClienteLupaRef, "NomeCliente")} onBlur={() => mostrarOpcoesDropdown(false, "", nomeClienteRef, nomeClienteLupaRef, "")} onChange={(e) => setNomeClienteSelecionado(e.target.value)} style={{ width: "18.1vw" }} />
                                </div>
                                {mostrarDropdown && opcaoSelecionada === "NomeCliente" && (
                                    <div className={style["dropdown"]} style={{ height: nomeCliente.length < 5 ? "fit-content" : "20vw", width: "20vw" }}>
                                        {opcoesDropdown.map((cliente, index) => (
                                            <div key={index} className={style["opcao-dropdown"]} onMouseDown={(e) => addCliente(e, cliente)}>
                                                {cliente}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Telefone*"} value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} onInput={inputMascaraTelefoneCelular} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"E-mail*"} value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                            </div>
                            <div className={style["box-veiculo"]}>
                                <h1>Veículo</h1>
                                <span className={style["input-label"]}>Placa*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]} ref={placaLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={placaSelecionada} ref={placaRef} onFocus={() => mostrarOpcoesDropdown(true, placa, placaRef, placaLupaRef, "Placa")} onBlur={() => mostrarOpcoesDropdown(false, "", placaRef, placaLupaRef, "")} maxLength={8} onChange={mascaraPlaca} style={{ width: "18.1vw" }} onKeyDown={(e) => addVeiculo(e)} />
                                </div>
                                {mostrarDropdown && opcaoSelecionada === "Placa" && (
                                    <div className={style["dropdown"]} style={{ height: placa.length < 5 ? "fit-content" : "20vw", width: "20vw" }}>
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
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Nome*</span>
                                        <div className={style["input-type"]}>
                                            <div className={style["img-lupa"]} ref={mecanicoLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                            <input type="text" value={mecanicoSelecionado} ref={mecanicoRef} onFocus={() => mostrarOpcoesDropdown(true, nomeMecanico, mecanicoRef, mecanicoLupaRef, "Mecanico")} onBlur={() => mostrarOpcoesDropdown(false, "", mecanicoRef, mecanicoLupaRef, "")} onChange={(e) => setMecanicoSelecionado(e.target.value)} style={{ width: "18.1vw" }} onKeyDown={(e) => addMecanico(e)} />
                                        </div>
                                        {mostrarDropdown && opcaoSelecionada === "Mecanico" && (
                                            <div className={style["dropdown"]} style={{ height: nomeMecanico.length < 5 ? "fit-content" : "20vw", width: "20vw" }}>
                                                {opcoesDropdown.map((mecanico, index) => (
                                                    <div key={index} className={style["opcao-dropdown"]} onMouseDown={(e) => addMecanico(e, mecanico)}>
                                                        {mecanico}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Telefone*</span>
                                        <div className={style["input-type"]}>
                                            <input type="text" value={telMecanico} onInput={inputMascaraTelefoneCelular} onChange={(e) => setTelMecanico(e.target.value)} maxLength={14} style={{ width: "20vw", borderRadius: "3vh", paddingLeft: "2vh" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={style["box-prazo-cliente"]}>
                                <div className={style["tema-prazos"]}>
                                    <h1>Prazos</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <Input nome={"Inicio*"} type={"date"} value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                        <Input nome={"Previsão de Término*"} type={"date"} value={dataFim} onChange={(e) => setDataFim(e.target.value)} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                    </div>
                                </div>
                                <div className={style["tema-classificacao"]}>
                                    <h1>Classificação</h1>
                                    <div className={style["box-cliente-inputs"]}>
                                        <div className={style["input-select"]}>
                                            <span className={style["input-label"]}>Tipo de OS*</span>
                                            <div className={style["input-type"]}>
                                                <div className={style["img-lupa"]} ref={tipoOsLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                                <input type="text" value={tipoOs} ref={tipoOsRef} onFocus={() => mostrarOpcoesDropdown(true, tiposDeOs, tipoOsRef, tipoOsLupaRef, "TipoOs")} onBlur={() => mostrarOpcoesDropdown(false, "", tipoOsRef, tipoOsLupaRef, "")} onChange={(e) => setTipoOsSelecionada(e.target.value)} style={{ width: "18.1vw" }} />
                                            </div>
                                            {mostrarDropdown && opcaoSelecionada === "TipoOs" && (
                                                <div className={style["dropdown"]} style={{ height: tiposDeOs.length < 5 ? "fit-content" : "20vw", width: "20vw" }}>
                                                    {opcoesDropdown.map((tipo, index) => (
                                                        <div key={index} className={style["opcao-dropdown"]} onMouseDown={(e) => addTipoOs(e, tipo)}>
                                                            {tipo}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={style["box-produtos"]}>
                                <div className={style["titulo-com-excluir"]}>
                                    <div className={style["titulo-desfazer"]}>
                                        <h1>Produtos</h1>
                                        {produtosLista.length > 1 && (
                                            <a onClick={excluirProduto} className={style["btn-excluir"]}>
                                                Desfazer
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {produtosLista.map((itemProduto, index) => (
                                    <div key={index} className={style["box-cliente-inputs"]}>
                                        <div className={style["input-select"]}>
                                            <span className={style["input-label"]}>Nome*</span>
                                            <div className={style["input-type"]}>
                                                <div className={style["img-lupa"]} ref={el => produtoLupaRef.current[index] = el}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                                <input type="text" id={"input-produto-" + index} autoComplete={false} value={produtoSelecionado[index]} ref={el => produtoRef.current[index] = el} onFocus={(e) => mostrarOpcoesDropdown(true, nomeProdutos, { current: produtoRef.current[index] }, { current: produtoLupaRef.current[index] }, e.target.id)} onBlur={() => mostrarOpcoesDropdown(false, "", { current: produtoRef.current[index] }, { current: produtoLupaRef.current[index] }, "")} onChange={(e) => setProdutoSelecionado(e.target.value)} style={{ width: "18.1vw" }} />
                                            </div>
                                            {mostrarDropdown && opcaoSelecionada === "input-produto-" + index && (
                                                <div className={style["dropdown"]} style={{ height: "10vw", width: "20vw" }}>
                                                    {opcoesDropdown.map((produto, indexOption) => (
                                                        <div key={indexOption} className={style["opcao-dropdown"]} onMouseDown={(e) => addProduto(e, produto, indexOption, index)}>
                                                            {produto}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Input nome={"Valor Unidade*"} value={valorUnidadeAtual[index]} onChange={(e) => setValorUnidadeAtual(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Quantidade*"} value={qtdProdutoAtual[index]} onChange={(e) => setarQtdAtual(e, index)} onKeyUp={() => calcularValorTotalProduto(index)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Garantia*"} value={garantiaProdutoAtual[index]} onChange={(e) => setGarantiaProdutoAtual(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Valor Total*"} value={valorTotalProdutoAtual[index]} onChange={(e) => setValorTotalProdutoAtual(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    </div>
                                ))}
                                <div className={style["box-add"]}>
                                    <a onClick={adicionarProdutoLista}><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-servicos"]}>
                                <div className={style["titulo-com-excluir"]}>
                                    <div className={style["titulo-desfazer"]}>
                                        <h1>Serviços</h1>
                                        {servicosLista.length > 1 && (
                                            <a onClick={excluirServico} className={style["btn-excluir"]}>
                                                Desfazer
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {servicosLista.map((itemServico, index) => (
                                    <div key={index} className={style["box-cliente-inputs"]}>
                                        <div className={style["input-select"]}>
                                            <span className={style["input-label"]}>Nome*</span>
                                            <div className={style["input-type"]}>
                                                <div className={style["img-lupa"]} ref={el => servicoLupaRef.current[index] = el}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                                <input type="text" id={"input-servico-" + index} autoComplete={false} value={servicoSelecionado[index]} ref={el => servicoRef.current[index] = el} onFocus={(e) => mostrarOpcoesDropdown(true, nomeServicos, { current: servicoRef.current[index] }, { current: servicoLupaRef.current[index] }, e.target.id)} onBlur={() => mostrarOpcoesDropdown(false, "", { current: servicoRef.current[index] }, { current: servicoLupaRef.current[index] }, "")} onChange={(e) => setServicoSelecionado(e.target.value)} style={{ width: "18.1vw" }} />
                                            </div>
                                            {mostrarDropdown && opcaoSelecionada === "input-servico-" + index && (
                                                <div className={style["dropdown"]} style={{ height: nomeServicos.length < 5 ? "fit-content" : "20vw", width: "20vw" }}>
                                                    {opcoesDropdown.map((servico, indexOption) => (
                                                        <div key={indexOption} className={style["opcao-dropdown"]} onMouseDown={(e) => addServico(e, servico, indexOption, index)}>
                                                            {servico}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Input nome={"Garantia*"} value={garantiaServico[index]} onChange={(e) => setValorUnidadeAtual(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Valor*"} value={valorServico[index]} onChange={(e) => setValorUnidadeAtual(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    </div>
                                ))}
                                <div className={style["box-add"]}>
                                    <a onClick={adicionarServicoLista}><img src={botaoAdicionar} alt="Botão de adicionar" /></a>
                                </div>
                            </div>

                            <div className={style["box-observacoes"]}>
                                <h1>Observações</h1>
                                <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} name="" id=""></textarea>
                            </div>

                            <div className={style["box-valor"]}>
                                <div className={style["titulo"]}><h1>Valor Total</h1></div>
                                <div className={style["valor"]}><h1></h1>{valorTotal}</div>
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
