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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const OrdemServico = () => {

    //#region Váriaveis


    const corInput = "#ECEAE5";
    const [valorTotalProdutoServico, setValorTotalProdutoServico] = useState(0);
    const [status, setStatus] = useState("Em aberto");
    const [garantia, setGarantia] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [observacoes, setObservacoes] = useState();
    const navigate = useNavigate();

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
    const [ano, setAno] = useState(0);
    const [idVeiculo, setIdVeiculo] = useState(0);
    const [infoVeiculo, setInfoVeiculo] = useState([]);
    const [placaSelecionada, setPlacaSelecionada] = useState("");
    const placaRef = useRef(null);
    const placaLupaRef = useRef(null);
    //#endregion

    //#region Váriaveis Produtos
    const [valorUnidade, setValorUnidade] = useState([]);
    const [qtdProduto, setQtdProduto] = useState([]);
    const [garantiaProduto, setGarantiaProduto] = useState([]);
    const [valorTotalProduto, setValorTotalProduto] = useState(0);
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
    const [produtoOrdemServico, setProdutoOrdemServico] = useState([{}]);
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
    const [servicoSelecionado, setServicoSelecionado] = useState([]);
    const [valorServico, setValorServico] = useState([]);
    const [valorTotalServicos, setValorTotalServicos] = useState(0);
    const [garantiaServico, setGarantiaServico] = useState([]);
    const [infoServicos, setInfoServicos] = useState([]);
    const [servicosLista, setServicosLista] = useState([
        {
            nome: "",
            valor: ""
        }
    ]);
    const [servicoOrdemServico, setServicoOrdemServico] = useState([{}]);
    //#endregion

    //#region Váriaveis Dropdown-List
    const [opcoesDropdown, setOpcoesDropdown] = useState([]);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
    //#endregion

    //#endregion







    //#region Funções


    //#region Funções Auxiliares

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

    //#endregion

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
        if (select !== "") {
            setPlacaSelecionada(select);
        } else{
            setPlacaSelecionada(e.target.value);
        }
    }

    const mascaraPlaca = (e) => {
        let placaDigitada = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
        if (placaDigitada.length > 3) {
            const letras = placaDigitada.substr(0, 3);
            const numeros = placaDigitada.substr(3).replace(/[^0-9]/g, '');
    
            if (letras.match(/[A-Z]{3}/)) {
                if (numeros.length <= 4) {
                    placaDigitada = `${letras}-${numeros}`;
                } else {
                    placaDigitada = `${letras}-${numeros.substr(0, 4)}`;
                }
            }
        }
        console.log(placaDigitada);
        setPlacaSelecionada(placaDigitada);
    };
    
    

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

    async function existeVeiculo() {
        try {
            const response = await api.get(`/veiculos/buscar-por-oficina/${sessionStorage.getItem("idOficina")}`);
            
            if (response.data && Array.isArray(response.data)) {
                // Encontra o veículo com a placa selecionada
                const veiculoEncontrado = response.data.find(veiculo => veiculo.placa === placaSelecionada);
                
                if (veiculoEncontrado) {
                    // Retorna o ID do veículo encontrado
                    return veiculoEncontrado.id;
                } else {
                    // Se nenhum veículo com a placa selecionada foi encontrado
                    return false;
                }
            } else {
                // Se a resposta não for um Array válido, retorna false para cadastrar um novo veículo
                return false;
            }
        } catch (error) {
            console.error("Erro ao buscar veículos", error);
            // Tratar o erro conforme necessário, por exemplo, retornando false para cadastrar um novo veículo
            return false;
        }
    }
    
    
    
    async function salvarOS() {
        if (!verificarOrdemServico()) {
            return;
        }
        debugger
        console.log(placaSelecionada)
        let veiculoExiste = false;
        let idVeiculoCriado = 0;
    
        while (!veiculoExiste) {
            try {
                veiculoExiste = await existeVeiculo();
    
                if (!veiculoExiste) {
                    // Se o veículo não existe, cadastra o veículo primeiro
                    const response = await api.post("/veiculos", {
                        fkCliente: idCliente,
                        placa: placaSelecionada,
                        marca: marca,
                        modelo: modelo,
                        cor: cor,
                        ano: ano
                    });
                    console.log(response.data.id);
                    idVeiculoCriado = response.data.id;
                }
            } catch (error) {
                console.error("Erro ao verificar/existir veículo", error);
                return; // Tratar o erro de forma apropriada conforme necessidade
            }
        }
    
        try {
            if(veiculoExiste != false){
                idVeiculoCriado = veiculoExiste;
            }
            // Após garantir que o veículo existe, prossegue com o cadastro da ordem de serviço
            const response = await api.post("/ordemDeServicos", {
                fkOficina: parseInt(sessionStorage.getItem("idOficina")),
                status: status,
                garantia: garantia,
                fkVeiculo: idVeiculoCriado,
                fkMecanico: idMecanico,
                dataInicio: dataInicio,
                dataFim: dataFim,
                tipoOs: tipoOs,
                produtos: produtoOrdemServico,
                servicos: servicoOrdemServico,
                observacoes: observacoes,
                valorTotal: parseFloat(valorTotalProdutoServico),
                quantidade: 0
            });
            toast.success("Ordem de serviço cadastrada com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao salvar ordem de serviço", error);
            toast.error("Erro ao salvar ordem de serviço");
            if(!existeVeiculo()){
                api.delete(`/veiculos/${idVeiculo}`);
            }
        }
    }
    
    

    function verificarOrdemServico() {
        debugger
        if (nomeClienteSelecionado === "" || telefoneCliente === "" || emailCliente === "" || placaSelecionada === "" || marca === "" || modelo === "" || cor === "" || ano === "" || tipoOs === "" || dataInicio === "" || dataFim === "" || observacoes === "" || garantia === "" || status === "") {
            toast.error("Preencha todos os campos obrigatórios!");
            return false;
        } else {
            return true;
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

            const novoValorUnidade = [...valorUnidade];
            novoValorUnidade[index] = infoProdutos[indexOption].valorVenda;
            setValorUnidade(novoValorUnidade);

            const novoValorGarantia = [...garantiaProduto];
            novoValorGarantia[index] = infoProdutos[indexOption].garantia;
            setGarantiaProduto(novoValorGarantia);

            const novoQtd = [...qtdProduto];
            novoQtd[index] = infoProdutos[indexOption].quantidade;
            setQtdProduto(novoQtd);
            setValorTotalProduto(prevValorTotal => prevValorTotal + novoValorUnidade[index]);

            const valorTotalProdutos = novoValorUnidade.reduce((total, valor) => total + parseFloat(valor), 0);
            console.log(valorTotalProdutos);
            setValorTotalProduto(valorTotalProdutos);
        }
    }

    function adicionarProdutoOrdemServico() {
        const novoProdutoOrdemServico = [];

        // Itera sobre os produtos selecionados
        for (let i = 0; i < produtoSelecionado.length; i++) {
            // Verifica se o produto foi selecionado (não vazio)
            if (produtoSelecionado[i]) {
                // Encontra o índice correspondente em infoProdutos usando produtoSelecionado[i]
                const indexOption = infoProdutos.findIndex(produto => produto.nome === produtoSelecionado[i]);

                // Se encontrou o produto correspondente
                if (indexOption !== -1) {
                    novoProdutoOrdemServico.push({
                        nome: produtoSelecionado[i],
                        valor: infoProdutos[indexOption].valor,
                        quantidade: qtdProduto[i],
                        garantia: garantiaProduto[i],
                        valorTotal: infoProdutos[indexOption].valor * qtdProduto[i]
                    });
                }
            }
        }

        // Atualiza o estado com o novo array de produtos na ordem de serviço
        setProdutoOrdemServico(novoProdutoOrdemServico);
    }

    useEffect(() => {
        adicionarProdutoOrdemServico();
    }, [produtoSelecionado]);

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
            // Salva o último produto antes de removê-lo
            const ultimoProduto = produtosLista[produtosLista.length - 1];

            setProdutosLista((prevProdutos) => prevProdutos.slice(0, -1));

            const index = produtosLista.length - 1;
            const novoProdutoSelecionado = [...produtoSelecionado];
            novoProdutoSelecionado[index] = '';
            setProdutoSelecionado(novoProdutoSelecionado);

            const novoValorUnidade = [...valorUnidade];
            novoValorUnidade[index] = '';
            setValorUnidade(novoValorUnidade);

            const novoQtdProduto = [...qtdProduto];
            novoQtdProduto[index] = '';
            setQtdProduto(novoQtdProduto);

            const novoGarantiaProduto = [...garantiaProduto];
            novoGarantiaProduto[index] = '';
            setGarantiaProduto(novoGarantiaProduto);

            const novaLista = produtoOrdemServico.slice(0, -1);
            setProdutoOrdemServico(novaLista);
            console.log(novaLista);
        }
    };

    //#endregion

    //#region Serviços

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
            const ultimoProduto = produtosLista[produtosLista.length - 1];

            setServicosLista((prevServicos) => prevServicos.slice(0, -1));

            const index = servicosLista.length - 1;
            const novoServicoSelecionado = [...servicoSelecionado];
            novoServicoSelecionado[index] = '';
            setServicoSelecionado(novoServicoSelecionado);

            const novoValorServico = [...valorServico];
            novoValorServico[index] = '';
            setValorServico(novoValorServico);

            const novoGarantiaServico = [...garantiaServico];
            novoGarantiaServico[index] = '';
            setGarantiaServico(novoGarantiaServico);
        }
    };

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

            const valorTotalServicos = novoValorServico.reduce((total, valor) => total + parseFloat(valor), 0);
            console.log(valorTotalServicos);
            setValorTotalServicos(valorTotalServicos);

            console.log(produtoOrdemServico);
        }
    }

    function adicionarServicoOrdemServico() {
        const novoServicoOrdemServico = [];

        // Itera sobre os serviços selecionados
        for (let i = 0; i < servicoSelecionado.length; i++) {
            // Verifica se o serviço foi selecionado (não vazio)
            if (servicoSelecionado[i]) {
                // Encontra o índice correspondente em infoServicos usando servicoSelecionado[i]
                const indexOption = infoServicos.findIndex(servico => servico.nome === servicoSelecionado[i]);

                // Se encontrou o serviço correspondente
                if (indexOption !== -1) {
                    novoServicoOrdemServico.push({
                        nome: servicoSelecionado[i],
                        valor: infoServicos[indexOption].valor,
                        garantia: garantiaServico[i]
                    });
                }
            }
        }

        // Atualiza o estado com o novo array de serviços na ordem de serviço
        setServicoOrdemServico(novoServicoOrdemServico);
    }

    useEffect(() => {
        adicionarServicoOrdemServico();
    }, [servicoSelecionado]);


    //#endregion

    useEffect(() => {
        const totalFormatado = (valorTotalServicos + valorTotalProduto).toFixed(2).replace('.', ',');;
        setValorTotalProdutoServico(totalFormatado);
    }, [valorTotalServicos, valorTotalProduto]);

    useEffect(() => {
        buscarCliente();
        buscarMecanico();
        buscarProdutos();
        buscarServicos();
    }, []);

    //#endregion

    return (
        <>
            <div>
                <NavBar currentPage={"os"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Ordens" resposta={["Cliente", "Fim", "Ações"]} tamanho="28vw" hasInput={false} ordem={true} endpoint={`/ordemDeServicos`} />
                <div className={style["box"]}>
                    <h1>Nova</h1>
                    <div className={style["container"]}>
                        <div className={style["box-container"]}>
                            <div className={style["box-header"]} style={{"marginBottom" : "2vh"}}>
                            <h1>Ordem de Serviço</h1>
                                <div className={style["box-header-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span>Status*</span>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="PENDENTE">PENDENTE</option>
                                            <option value="CONCLUIDO">CONCLUIDO</option>
                                        </select>
                                    </div>
                                    <div className={style["input-select"]}>
                                        <span>Garantia*</span>
                                        <select value={garantia} onChange={(e) => setGarantia(e.target.value)}>
                                            <option value="">Selecione</option>
                                            <option value="Sem Garantia">Sem Garantia</option>
                                            <option value="1 mês">1 mês</option>
                                            <option value="2 mêses">2 mêses</option>
                                        </select>
                                    </div>
                                    {/* <h2><b>Token</b><br />{token}</h2> */}
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
                                    <div className={style["dropdown"]} style={{ height: nomeCliente.length < 5 ? "fit-content" : "14vh", width: "20vw" }}>
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
                                <span className={style["input-label"]}>Placa - <span style={{fontWeight: "normal"}}>Exemplo de Placa: (AAA-0000)</span>*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]} ref={placaLupaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={placaSelecionada} ref={placaRef} onFocus={() => mostrarOpcoesDropdown(true, placa, placaRef, placaLupaRef, "Placa")} onBlur={() => mostrarOpcoesDropdown(false, "", placaRef, placaLupaRef, "")} maxLength={8} onChange={mascaraPlaca} style={{ width: "18.1vw" }} onKeyDown={(e) => addVeiculo(e)} />
                                </div>
                                {mostrarDropdown && opcaoSelecionada === "Placa" && (
                                    <div className={style["dropdown"]} style={{ height: placa.length < 5 ? "fit-content" : "14vh", width: "20vw" }}>
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
                                            <div className={style["dropdown"]} style={{ height: nomeMecanico.length < 5 ? "fit-content" : "14vh", width: "20vw" }}>
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
                                                <div className={style["dropdown"]} style={{ height: tiposDeOs.length < 5 ? "fit-content" : "14vh", width: "20vw" }}>
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
                                                <input type="text" id={"input-produto-" + index} autoComplete={"off"} value={produtoSelecionado[index]} ref={el => produtoRef.current[index] = el} onFocus={(e) => mostrarOpcoesDropdown(true, nomeProdutos, { current: produtoRef.current[index] }, { current: produtoLupaRef.current[index] }, e.target.id)} onBlur={() => mostrarOpcoesDropdown(false, "", { current: produtoRef.current[index] }, { current: produtoLupaRef.current[index] }, "")} onChange={(e) => setProdutoSelecionado(e.target.value)} style={{ width: "18.1vw" }} />
                                            </div>
                                            {mostrarDropdown && opcaoSelecionada === "input-produto-" + index && (
                                                <div className={style["dropdown"]} style={{ height: "14vh", width: "20vw" }}>
                                                    {opcoesDropdown.map((produto, indexOption) => (
                                                        <div key={indexOption} className={style["opcao-dropdown"]} onMouseDown={(e) => addProduto(e, produto, indexOption, index)}>
                                                            {produto}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Input nome={"Valor Unidade*"} disabled={true} value={valorUnidade[index]} onChange={(e) => setValorUnidade(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Quantidade Restante*"} disabled={true} value={qtdProduto[index]} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Garantia*"} disabled={true} value={garantiaProduto[index]} onChange={(e) => setGarantiaProduto(e.target.value)} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
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
                                                <input type="text" id={"input-servico-" + index} autoComplete={"off"} value={servicoSelecionado[index]} ref={el => servicoRef.current[index] = el} onFocus={(e) => mostrarOpcoesDropdown(true, nomeServicos, { current: servicoRef.current[index] }, { current: servicoLupaRef.current[index] }, e.target.id)} onBlur={() => mostrarOpcoesDropdown(false, "", { current: servicoRef.current[index] }, { current: servicoLupaRef.current[index] }, "")} onChange={(e) => setServicoSelecionado(e.target.value)} style={{ width: "18.1vw" }} />
                                            </div>
                                            {mostrarDropdown && opcaoSelecionada === "input-servico-" + index && (
                                                <div className={style["dropdown"]} style={{ height: nomeServicos.length < 5 ? "fit-content" : "14vh", width: "20vw" }}>
                                                    {opcoesDropdown.map((servico, indexOption) => (
                                                        <div key={indexOption} className={style["opcao-dropdown"]} onMouseDown={(e) => addServico(e, servico, indexOption, index)}>
                                                            {servico}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Input nome={"Garantia*"} disabled={true} value={garantiaServico[index]} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                        <Input nome={"Valor*"} disabled={true} value={valorServico[index]} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
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
                                <div className={style["valor"]}><h1>R${valorTotalProdutoServico}</h1></div>
                            </div>

                            <div className={style["box-salvar"]}>
                                {<Botao nome={"Salvar"} onClick={salvarOS} cor={"#C66D2C"} />}
                            </div>
                        </div>
                    </div>
                </div>
            </Alignner>
        </>
    );
};

export default OrdemServico;
