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
import { useNavigate, useParams } from "react-router-dom";


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
    const [veiculo, setVeiculo] = useState({});
    const [mecanico, setMecanico] = useState({
        nome: "",
        telefone: ""
    });
    const [produtos, setProdutos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [cliente, setCliente] = useState({});
    const [tipoOs, setTipoOs] = useState("");
    const [idOrdemServico, setIdOrdemServico] = useState(0);
    const [oficina, setOficina] = useState({});
    const navigate = useNavigate();
    //#endregion

    function buscarOrdemServico() {
        api.get(`/ordemDeServicos/token/${token}`).then((response) => {
            setIdOrdemServico(response.data.id);
            setDataInicio(response.data.dataInicio);
            setDataFim(response.data.dataFim);
            setStatus(response.data.status);
            setValorTotal(response.data.valorTotal);
            setTipoOs(response.data.tipoOs);
            setGarantia(response.data.garantia);
            setObservacoes(response.data.observacoes);
            setOficina(response.data.oficina);
            setVeiculo(response.data.veiculo);
            setMecanico(response.data.mecanico);
            setProdutos(response.data.produtos);
            setServicos(response.data.servicos);
        }).catch((error) => {
            console.log(error);
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
                                        <select value={status} disabled>
                                            <option value="">Selecione</option>
                                            <option value="PENDENTE">PENDENTE</option>
                                            <option value="CONCLUIDO">CONCLUIDO</option>
                                        </select>
                                    </div>
                                    <div className={style["input-select"]}>
                                        <span>Garantia*</span>
                                        <select value={garantia} disabled>
                                            <option value="">Selecione</option>
                                            <option value="Sem Garantia">Sem Garantia</option>
                                            <option value="1 mês">1 mês</option>
                                            <option value="2 mêses">2 mêses</option>
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
                                    <Input nome={"Ano*"} value={veiculo.anoFabricacao} disabled={true} tamanho={"12vw"} corBackground={corInput} />
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
                                    <Input nome={"Valor Unidade*"} value={itemProduto.valorVenda} disabled={true} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    <Input nome={"Quantidade Restante*"} value={itemProduto.quantidade} disabled={true} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    <Input nome={"Garantia*"} value={itemProduto.garantia} disabled={true} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                </div>
                            ))}
                        </div>

                        <div className={style["box-servicos"]} style={servicos.length === 0 ? {marginTop: "5vh"}: {marginTop: "0vh"}}>
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
                                    <Input nome={"Garantia*"} disabled={true} value={itemServico.garantia} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                    <Input nome={"Valor*"} disabled={true} value={itemServico.valorServico} corBackground={corInput} tamanho={"100%"} tamanhoFundo={"40%"} />
                                </div>
                            ))}
                        </div>

                        <div className={style["box-observacoes"]} style={servicos.length === 0 ? {marginTop: "5vh"}: {marginTop: "0vh"}}>
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
