import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import style from "./OrdemServico.module.css";
import api from "../../services/api";
import lupaImg from "./../../utils/assets/lupa.svg";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


const OrdemServicoVisualizacao = () => {
    //#region Váriaveis
    const corInput = "#ECEAE5";
    const { token } = useParams();
    const [valorTotal, setValorTotal] = useState(0);
    const [status, setStatus] = useState("Em aberto");
    const [garantia, setGarantia] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataFim, setDataFim] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [veiculo, setVeiculo] = useState({
        placa: "",
        marca: "",
        modelo: "",
        ano: 0,
        cor: ""
    });
    const [mecanico, setMecanico] = useState({
        nome: "",
        telefone: ""
    });
    const [produtos, setProdutos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [cliente, setCliente] = useState({
        nome: "",
        telefone: "",
        email: ""
    });
    const [tipoOs, setTipoOs] = useState("");
    const [idOrdemServico, setIdOrdemServico] = useState(0);
    const [oficina, setOficina] = useState({});
    const navigate = useNavigate();
    const [novoStatus, setNovoStatus] = useState("");

    //#endregion

    function buscarOrdemServico() {
        api.get(`/ordemDeServicos/token/${token}`).then((response) => {
            console.log(response.data);

            // Desestruturação dos dados recebidos para atribuir aos estados
            const {
                id,
                status,
                dataInicio,
                dataFim,
                tipoOs,
                nomeCliente,
                telefoneCliente,
                emailCliente,
                garantia,
                placaVeiculo,
                marcaVeiculo,
                modeloVeiculo,
                anoVeiculo,
                corVeiculo,
                nomeMecanico,
                telefoneMecanico,
                valorTotal,
                observacoes,
                produtos,
                servicos
            } = response.data;

            // Atualiza os estados com os valores recebidos
            setIdOrdemServico(id);
            setStatus(status);
            setDataInicio(dataInicio);
            setDataFim(dataFim);
            setTipoOs(tipoOs);
            setValorTotal(valorTotal);
            setObservacoes(observacoes);

            setCliente({
                nome: nomeCliente,
                telefone: telefoneCliente,
                email: emailCliente
            });

            setGarantia(garantia);

            setVeiculo({
                placa: placaVeiculo,
                marca: marcaVeiculo,
                modelo: modeloVeiculo,
                ano: anoVeiculo,
                cor: corVeiculo
            });

            setMecanico({
                nome: nomeMecanico,
                telefone: telefoneMecanico
            });

            setProdutos(produtos); // Lista de nomes dos produtos
            setServicos(servicos); // Lista de nomes dos serviços

        }).catch((error) => {
            console.error("Erro ao buscar a ordem de serviço:", error);
        });
    }

    function atualizarStatus(novoStatus) {
        api.put(`/ordemDeServicos/${idOrdemServico}?status=${novoStatus}`)
            .then((response) => {
                console.log("Status atualizado com sucesso:", response.data);
                setStatus(novoStatus);
                toast.success("Status da ordem de serviço atualizado com sucesso!");
            })
            .catch((error) => {
                console.error("Erro ao atualizar o status da ordem de serviço:", error);
                toast.error("Erro ao atualizar o status. Tente novamente.");
            });
    }


    useEffect(() => {
        buscarOrdemServico();
    }, [token]);

    useEffect(() => {
        if (veiculo && veiculo.cliente) {
            setCliente(veiculo.cliente);
        }
    }, [veiculo]);

    return (
        <>
            <div>
                <NavBar currentPage={"os"} />
            </div>
            <Alignner>
                <BoxInfo titulo="Ordens" resposta={["Cliente", "Fim", "Ações"]} tamanho="28vw" hasInput={false} ordem={true} endpoint={`/ordemDeServicos`} />
                <div className={style["box"]}>
                    <h1>Visualização</h1>
                    <div className={style["container"]}>
                        <div className={style["box-container"]}>
                            <div className={style["box-header"]}>
                                <h1>#{idOrdemServico}</h1>
                                <div className={style["box-header-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span>Status*</span>
                                        <select
                                            value={ status ||novoStatus}
                                            onChange={(e) => atualizarStatus(e.target.value)}
                                        >
                                            <option value="">Selecione</option>
                                            <option value="EM ABERTO">EM ABERTO</option>
                                            <option value="CONCLUIDO">CONCLUIDO</option>
                                        </select>
                                    </div>

                                    <div className={style["input-select"]}>
                                        <span>Garantia*</span>
                                        <select value={garantia} disabled>
                                            <option value="Sem Garantia">Sem Garantia</option>
                                            <option value="3 meses">3 meses</option>
                                            <option value="6 meses">6 meses</option>
                                        </select>
                                    </div>
                                    <h2><b>Token</b><br />{token}</h2>
                                </div>
                            </div>
                            <div className={style["box-cliente"]}>
                                <h1>Cliente</h1>
                                <span className={style["input-label"]}>Nome*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={cliente.nome} disabled style={{ width: "18.1vw" }} />
                                </div>
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Telefone*"} value={cliente.telefone} disabled={true} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"E-mail*"} value={cliente.email} disabled={true} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                            </div>
                            <div className={style["box-veiculo"]}>
                                <h1>Veículo</h1>
                                <span className={style["input-label"]}>Placa*</span>
                                <div className={style["input-type"]}>
                                    <div className={style["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                    <input type="text" value={veiculo.placa} disabled style={{ width: "18.1vw" }} />
                                </div>
                                <div className={style["box-veiculo-inputs"]}>
                                    <Input nome={"Marca*"} value={veiculo.marca} disabled={true} tamanho={"15vw"} corBackground={corInput} />
                                    <Input nome={"Modelo*"} value={veiculo.modelo} disabled={true} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Ano*"} value={veiculo.ano} disabled={true} tamanho={"12vw"} corBackground={corInput} />
                                    <Input nome={"Cor*"} value={veiculo.cor} disabled={true} tamanho={"12vw"} corBackground={corInput} />
                                </div>
                            </div>
                            <div className={style["box-responsavel"]}>
                                <h1>Responsável</h1>
                                <div className={style["responsavel-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Nome*</span>
                                        <div className={style["input-type"]}>
                                            <input type="text" value={mecanico != null ? mecanico.nome : "Não definido"} disabled style={{ width: "18.1vw", "borderTopLeftRadius": "2.5vh", "borderBottomLeftRadius": "2.5vh", paddingLeft: "1.2vw" }} />
                                        </div>
                                    </div>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Telefone*</span>
                                        <div className={style["input-type"]}>
                                            <input type="text" value={mecanico != null ? mecanico.telefone : "Não definido"} disabled style={{ width: "20vw", borderRadius: "3vh", paddingLeft: "2vh" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style["box-prazo-cliente"]}>
                            <div className={style["tema-prazos"]}>
                                <h1>Prazos</h1>
                                <div className={style["box-cliente-inputs"]}>
                                    <Input nome={"Inicio*"} type={"date"} value={dataInicio} disabled={true} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"50%"} />
                                    <Input nome={"Previsão de Término*"} type={"date"} value={dataFim} disabled={true} corBackground={corInput} tamanho={"98%"} tamanhoFundo={"90%"} />
                                </div>
                            </div>
                            <div className={style["tema-classificacao"]}>
                                <h1>Classificação</h1>
                                <div className={style["box-cliente-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Tipo de OS*</span>
                                        <div className={style["input-type"]}>
                                            <div className={style["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                            <input type="text" value={tipoOs} disabled style={{ width: "18.1vw" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style["box-produtos"]}>
                            <div className={style["titulo-com-excluir"]}>
                                <div className={style["titulo-desfazer"]}>
                                    <h1>Produtos</h1>
                                </div>
                            </div>

                            {produtos.length === 0 && <span className={style["input-label"]}>Nenhum produto cadastrado</span>}
                            {produtos.map((itemProduto, index) => (
                                <div key={index} className={style["box-cliente-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Nome*</span>
                                        <div className={style["input-type"]}>
                                            <div className={style["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                            <input type="text" value={itemProduto.nome} disabled style={{ width: "18.1vw" }} />
                                        </div>
                                    </div>
                                    <Input
                                        nome={"Valor Unidade*"}
                                        value={itemProduto.valor}
                                        disabled={true}
                                        corBackground={corInput}
                                        tamanho={"100%"}
                                        tamanhoFundo={"40%"}
                                    />
                                    <Input
                                        nome={"Quantidade*"}
                                        value={itemProduto.quantidade}
                                        disabled={true}
                                        corBackground={corInput}
                                        tamanho={"100%"}
                                        tamanhoFundo={"40%"}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={style["box-servicos"]} style={servicos.length === 0 ? { marginTop: "5vh" } : { marginTop: "0vh" }}>
                            <div className={style["titulo-com-excluir"]}>
                                <div className={style["titulo-desfazer"]}>
                                    <h1>Serviços</h1>
                                </div>
                            </div>
                            {servicos.length === 0 && <span className={style["input-label"]}>Nenhum serviço cadastrado</span>}
                            {servicos.map((itemServico, index) => (
                                <div key={index} className={style["box-cliente-inputs"]}>
                                    <div className={style["input-select"]}>
                                        <span className={style["input-label"]}>Nome*</span>
                                        <div className={style["input-type"]}>
                                            <div className={style["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                                            <input type="text" value={itemServico.nome} disabled style={{ width: "18.1vw" }} />
                                        </div>
                                    </div>
                                    <Input
                                        nome={"Garantia*"}
                                        disabled={true}
                                        value={itemServico.garantia}
                                        corBackground={corInput}
                                        tamanho={"100%"}
                                        tamanhoFundo={"40%"}
                                    />
                                    <Input
                                        nome={"Valor*"}
                                        disabled={true}
                                        value={itemServico.valor}
                                        corBackground={corInput}
                                        tamanho={"100%"}
                                        tamanhoFundo={"40%"}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className={style["box-observacoes"]} style={servicos.length === 0 ? { marginTop: "5vh" } : { marginTop: "0vh" }}>
                            <h1>Observações</h1>
                            <textarea value={observacoes} disabled></textarea>
                        </div>

                        <div className={style["box-valor"]}>
                            <div className={style["titulo"]}><h1>Valor Total</h1></div>
                            <div className={style["valor"]}><h1>R${valorTotal}</h1></div>
                        </div>
                    </div>
                </div>
            </Alignner>
        </>
    );
};

export default OrdemServicoVisualizacao;
