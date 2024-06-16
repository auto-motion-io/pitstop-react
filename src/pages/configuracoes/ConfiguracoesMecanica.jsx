import React, { useEffect, useRef, useState } from 'react';
import styles from './ConfiguracoesMecanica.module.css';
import NavBar from '../../components/navbar/NavBar';
import Input from '../../components/input/Input';
import whatsappImg from "./../../utils/assets/whatsapp.svg";
import botaoCheck from "./../../utils/assets/botao-check.svg";
import botaoCheckColorido from "./../../utils/assets/botao-check-colorido.svg";
import relogioImg from "./../../utils/assets/relogio.svg";
import lupaImg from "./../../utils/assets/lupa.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';
import { inputMascaraTelefoneCelular, servicosOficina, marcasDeVeiculos, tiposDeVeiculos, tiposPropulsaoComuns } from '../../utils/global';
import iconSave from "./../../utils/assets/icon-save.png";
import api from '../../services/api';
import { toast } from 'react-toastify';
import InputTag from '../../components/inputTag/InputTag';

function ConfiguracoesMecanica() {
    const [whatsapp, setWhatsapp] = useState("");
    const [horarioSEntrada, setHorarioSEntrada] = useState("");
    const [horarioSSaida, setHorarioSSaida] = useState("");
    const [horarioFSEntrada, setHorarioFSEntrada] = useState("");
    const [horarioFSSaida, setHorarioFSSaida] = useState("");
    const [diasSemana, setDiasSemana] = useState([]);
    const [servicos, setServicos] = useState(servicosOficina);
    const [servicosFiltrados, setServicosFiltrados] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [veiculosFiltrados, setVeiculosFiltrados] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [marcasFiltradas, setMarcasFiltradas] = useState([]);
    const [tipoPropulsao, setTipoPropulsao] = useState([]);
    const [tipoPropulsaoFiltrados, setTipoPropulsaoFiltrados] = useState([]);
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [opcoesDropdown, setOpcoesDropdown] = useState([]);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

    const marcaRef = useRef(null);
    const lupaMarcaRef = useRef(null);
    const servicoRef = useRef(null);
    const lupaServicoRef = useRef(null);
    const veiculoRef = useRef(null);
    const lupaVeiculoRef = useRef(null);
    const tipoPropRef = useRef(null);
    const lupaTipoPropRef = useRef(null);

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

    function getConfig() {
        api.get(`/gerentes`).then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].email === sessionStorage.getItem("email")) {
                    setWhatsapp(response.data[i].oficina.informacoesOficina.whatsapp);
                    setHorarioSEntrada(response.data[i].oficina.informacoesOficina.horarioIniSem);
                    setHorarioSSaida(response.data[i].oficina.informacoesOficina.horarioFimSem);
                    setHorarioFSEntrada(response.data[i].oficina.informacoesOficina.horarioIniFds);
                    setHorarioFSSaida(response.data[i].oficina.informacoesOficina.horarioFimFds);
                    setDiasSemana(response.data[i].oficina.informacoesOficina.diasSemanaAberto.split(";").map(item => item === 'true'));
                    setVeiculos(response.data[i].oficina.informacoesOficina.tipoVeiculosTrabalha.split(";"));
                    setMarcas(response.data[i].oficina.informacoesOficina.marcasVeiculosTrabalha.split(";"));
                    setTipoPropulsao(response.data[i].oficina.informacoesOficina.tipoPropulsaoTrabalha.split(";"));
                }
            }
        }).catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    function salvarConfig() {
        api.put(`/infos-oficina/${sessionStorage.getItem("idOficina")}`, {
            whatsapp: whatsapp,
            horarioIniSem: horarioSEntrada,
            horarioFimSem: horarioSSaida,
            horarioIniFds: horarioFSEntrada,
            horarioFimFds: horarioFSSaida,
            diasSemanaAberto: diasSemana.join(";"),
            tipoPropulsaoTrabalha: tipoPropulsao.join(";"),
            tipoVeiculosTrabalha: veiculos.join(";"),
            marcasVeiculosTrabalha: marcas.join(";")
        }).then((response) => {
            toast.success("Configurações salvas com sucesso!");
        }).catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    //#region Marcas

    function deletarMarca(key) {
        setMarcas(prevState => {
            const novoArray = [...prevState];
            novoArray.splice(key, 1);
            return novoArray;
        });
    }

    function filtrarMarca(e) {
        const filtro = e.target.value.toLowerCase();
        const marcasFiltradas = marcas.filter((marca) =>
            marca.toLowerCase().startsWith(filtro)
        );
        setMarcasFiltradas(marcasFiltradas);
    }

    function addMarca(e, select = "") {
        if (e.key === "Enter") {
            setMarcas(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";
                changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", marcaRef, lupaMarcaRef);
                setMostrarDropdown(false);
                return novoArray;
            });
        } else if (select !== "") {
            setMarcas(prevState => {
                const novoArray = [...prevState];
                novoArray.push(select);
                return novoArray;
            });
        }
    }

    //#endregion

    //#region Servicos

    function deletarServico(key) {
        setServicos(prevState => {
            const novoArray = [...prevState];
            novoArray.splice(key, 1);
            return novoArray;
        });
    }

    function filtrarServicos(e) {
        const filtro = e.target.value.toLowerCase();
        const servicosFiltrados = servicos.filter((servicos) =>
            servicos.toLowerCase().startsWith(filtro)
        );
        setServicosFiltrados(servicosFiltrados);
    }

    function addServico(e, select = "") {
        if (e.key === "Enter") {
            setServicos(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";
                changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", servicoRef, lupaServicoRef);
                setMostrarDropdown(false);
                return novoArray;
            });
        } else if (select !== "") {
            setServicos(prevState => {
                const novoArray = [...prevState];
                novoArray.push(select);
                return novoArray;
            });
        }
    }

    //#endregion

    //#region Veiculos

    function deletarVeiculo(key) {
        setVeiculos(prevState => {
            const novoArray = [...prevState];
            novoArray.splice(key, 1);
            return novoArray;
        });
    }

    function filtrarVeiculos(e) {
        const filtro = e.target.value.toLowerCase();
        const veiculosFiltrados = veiculos.filter((veiculos) =>
            veiculos.toLowerCase().startsWith(filtro)
        );
        setVeiculosFiltrados(veiculosFiltrados);
    }

    function addVeiculo(e, select = "") {
        if (e.key === "Enter") {
            setVeiculos(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";
                changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", veiculoRef, lupaVeiculoRef);
                setMostrarDropdown(false);
                return novoArray;
            });
        } else if (select !== "") {
            setVeiculos(prevState => {
                const novoArray = [...prevState];
                novoArray.push(select);
                return novoArray;
            });
        }
    }

    //#endregion

    //#region TipoPropulsao

    function deletarTipoPropulsao(key) {
        setTipoPropulsao(prevState => {
            const novoArray = [...prevState];
            novoArray.splice(key, 1);
            return novoArray;
        });
    }

    function filtrarTipoPropulsao(e) {
        const filtro = e.target.value.toLowerCase();
        const tipoPropulsaoFiltrados = tipoPropulsao.filter((tipoPropulsao) =>
            tipoPropulsao.toLowerCase().startsWith(filtro)
        );
        setTipoPropulsaoFiltrados(tipoPropulsaoFiltrados);
    }

    function addTipoPropulsao(e, select = "") {
        if (e.key === "Enter") {
            setTipoPropulsao(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";
                changeBorderRadius("0 3vh 3vh 0", "3vh 0 0 3vh", tipoPropRef, lupaTipoPropRef);
                setMostrarDropdown(false);
                return novoArray;
            });
        } else if (select !== "") {
            setTipoPropulsao(prevState => {
                const novoArray = [...prevState];
                novoArray.push(select);
                return novoArray;
            });
        }
    }

    //#endregion

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <div>
            <div>
                <NavBar currentPage={"configuracoes"} />
            </div>
            <div className={styles["container"]}>
                <MenuConfig ativo={2} />
                <div className='container-coluna'>
                    <div className={styles["card-contato"]}>
                        <div className={styles["header"]}>
                            <h1>Contato</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>

                        <div className={styles["whatsapp-input"]}>
                            <img src={whatsappImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={whatsapp} maxLength={15} onInput={inputMascaraTelefoneCelular} onChange={(e) => setWhatsapp(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["card-horarios"]}>
                        <div className={styles["header"]}>
                            <h1>Horários</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>
                        <h4>Semana</h4>
                        <div className={styles["semana-input"]}>
                            <img src={relogioImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} type={"time"} tamanhoFundo={"85%"} value={horarioSEntrada} onChange={(e) => setHorarioSEntrada(e.target.value)} />
                            <Input tamanho={"100%"} type={"time"} tamanhoFundo={"85%"} value={horarioSSaida} onChange={(e) => setHorarioSSaida(e.target.value)} />
                        </div>
                        <h4>Fim de Semana</h4>
                        <div className={styles["semana-input"]}>
                            <img src={relogioImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} type={"time"} tamanhoFundo={"85%"} value={horarioFSEntrada} onChange={(e) => setHorarioFSEntrada(e.target.value)} />
                            <Input tamanho={"100%"} type={"time"} tamanhoFundo={"85%"} value={horarioFSSaida} onChange={(e) => setHorarioFSSaida(e.target.value)} />
                        </div>
                        <h1 className={styles["titulo-dias-semana"]}>Dias da Semana</h1>
                        <div className={styles["dias-semana"]}>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[0] = novoArray[0] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[0] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>T</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[1] = novoArray[1] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[1] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[2] = novoArray[2] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[2] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[3] = novoArray[3] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[3] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[4] = novoArray[4] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[4] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[5] = novoArray[5] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[5] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>D</h4>
                                <a href style={{ cursor: 'pointer' }} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState];
                                    novoArray[6] = novoArray[6] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[6] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-coluna'>
                    <div className={styles["card-servicos"]}>
                        <div className={styles["header"]}>
                            <h1>Serviços</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}>
                                <img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" />
                            </a>
                        </div>
                        <h5>Insira os serviços que sua oficina oferece</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]} ref={lupaServicoRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" ref={servicoRef} onChange={(e) => filtrarServicos(e)} onFocus={() => mostrarOpcoesDropdown(true, servicosOficina, servicoRef, lupaServicoRef, "Serviços")} onBlur={() => mostrarOpcoesDropdown(false, "", servicoRef, lupaServicoRef, "")} onKeyDown={(e) => addServico(e)} />
                        </div>
                        {mostrarDropdown && opcaoSelecionada === "Serviços" && (
                            <div className={styles["dropdown"]}>
                                {opcoesDropdown.map((servico, index) => (
                                    <div key={index} className={styles["opcao-dropdown"]} onMouseDown={(e) => addServico(e, servico)}>
                                        {servico}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles["box"]}>
                            <div className={styles["box-tag"]}>
                                {servicosFiltrados.length !== 0 ? servicosFiltrados.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarServico(index)} />
                                }) : servicos.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarServico(index)} />
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles["card-veiculos"]}>
                        <div className={styles["header"]}>
                            <h1>Veículos</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>
                        <h5>Selecione o(s) tipo(s) de veículo(s)</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]} ref={lupaVeiculoRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" ref={veiculoRef} onChange={(e) => filtrarVeiculos(e)} onFocus={() => mostrarOpcoesDropdown(true, tiposDeVeiculos, veiculoRef, lupaVeiculoRef, "Veiculos")} onBlur={() => mostrarOpcoesDropdown(false, "", veiculoRef, lupaVeiculoRef, "")} onKeyDown={(e) => addVeiculo(e)} />
                        </div>
                        {mostrarDropdown && opcaoSelecionada === "Veiculos" && (
                            <div className={styles["dropdown"]} style={{ "height": "15vh" }}>
                                {opcoesDropdown.map((veiculo, index) => (
                                    <div key={index} className={styles["opcao-dropdown"]} onMouseDown={(e) => addVeiculo(e, veiculo)}>
                                        {veiculo}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles["box"]}>
                            <div className={styles["box-tag"]}>
                                {veiculosFiltrados.length !== 0 ? veiculosFiltrados.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarVeiculo(index)} />
                                }) : veiculos.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarVeiculo(index)} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-coluna'>
                    <div className={styles["card-marcas"]}>
                        <div className={styles["header"]}>
                            <h1>Marcas</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>
                        <h5>Insira as marcas nas quais sua oficina tem especialidade</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]} ref={lupaMarcaRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" ref={marcaRef} onChange={(e) => filtrarMarca(e)} onFocus={() => mostrarOpcoesDropdown(true, marcasDeVeiculos, marcaRef, lupaMarcaRef, "Marcas")} onBlur={() => mostrarOpcoesDropdown(false, "", marcaRef, lupaMarcaRef, "")} onKeyDown={(e) => addMarca(e)} />
                        </div>
                        {mostrarDropdown && opcaoSelecionada === "Marcas" && (
                            <div className={styles["dropdown"]}>
                                {opcoesDropdown.map((marca, index) => (
                                    <div key={index} className={styles["opcao-dropdown"]} onMouseDown={(e) => addMarca(e, marca)}>
                                        {marca}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles["box"]}>
                            <div className={styles["box-tag"]}>
                                {marcasFiltradas.length !== 0 ? marcasFiltradas.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarMarca(index)} />
                                }) : marcas.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarMarca(index)} />
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={styles["card-tipo-propulsao"]}>
                        <div className={styles["header"]}>
                            <h1>Tipo de Propulsão</h1>
                            <a href style={{ cursor: "pointer" }} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>
                        <h5>Selecione o(s) tipo(s) de propulsão dos veículo</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]} ref={lupaTipoPropRef}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" ref={tipoPropRef} onChange={(e) => filtrarTipoPropulsao(e)} onFocus={() => mostrarOpcoesDropdown(true, tiposPropulsaoComuns, tipoPropRef, lupaTipoPropRef, "Tipo Propulsão")} onBlur={() => mostrarOpcoesDropdown(false, "", tipoPropRef, lupaTipoPropRef, "")} onKeyDown={(e) => addTipoPropulsao(e)} />
                        </div>
                        {mostrarDropdown && opcaoSelecionada === "Tipo Propulsão" && (
                            <div className={styles["dropdown"]} style={{ "height": "15vh" }}>
                                {opcoesDropdown.map((tipoPropulsao, index) => (
                                    <div key={index} className={styles["opcao-dropdown"]} onMouseDown={(e) => addTipoPropulsao(e, tipoPropulsao)}>
                                        {tipoPropulsao}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className={styles["box"]}>
                            <div className={styles["box-tag"]}>
                                {tipoPropulsaoFiltrados.length !== 0 ? tipoPropulsaoFiltrados.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarTipoPropulsao(index)} />
                                }) : tipoPropulsao.map((item, index) => {
                                    return <InputTag key={index} nome={item} onClick={() => deletarTipoPropulsao(index)} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracoesMecanica;