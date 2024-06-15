import React, { useEffect, useState } from 'react';
import styles from './ConfiguracoesMecanica.module.css';
import NavBar from '../../components/navbar/NavBar';
import Input from '../../components/input/Input';
import whatsappImg from "./../../utils/assets/whatsapp.svg";
import botaoCheck from "./../../utils/assets/botao-check.svg";
import botaoCheckColorido from "./../../utils/assets/botao-check-colorido.svg";
import relogioImg from "./../../utils/assets/relogio.svg";
import lupaImg from "./../../utils/assets/lupa.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';
import { inputMascaraTelefoneCelular } from '../../utils/global';
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
    const [servicos, setServicos] = useState("");
    const [veiculos, setVeiculos] = useState("");
    const [marcas, setMarcas] = useState([]);
    const [marcasFiltradas, setMarcasFiltradas] = useState([]);
    const [tipoPropulsao, setTipoPropulsao] = useState("teste");
    

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
                    setMarcas(response.data[i].oficina.informacoesOficina.marcasVeiculosTrabalha.split(";"));
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
            tipoPropulsaoTrabalha: tipoPropulsao,
            marcasVeiculosTrabalha: marcas,
        }).then((response) => {
            toast.success("Configurações salvas com sucesso!");
            console.log("Configurações salvas com sucesso! "  + response.data);
        }).catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    function deletarMarca(key){
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
        console.log(marcasFiltradas);
        setMarcasFiltradas(marcasFiltradas);
    }

    function addMarca(e) {
        if (e.key === "Enter") {
            setMarcas(prevState => {
                const novoArray = [...prevState];
                novoArray.push(e.target.value);
                e.target.value = "";  // Clear the input after adding the marca
                return novoArray;
            });
        }
    }
        

    useEffect(() => {
        getConfig();

        console.log(marcas);

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
                            <a style={{cursor: "pointer"}} title="Salvar" className={styles["botao-salvar"]} onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
                        </div>
                        <div className={styles["whatsapp-input"]}>
                            <img src={whatsappImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={whatsapp} maxLength={15} onInput={inputMascaraTelefoneCelular} onChange={(e) => setWhatsapp(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["card-horarios"]}>
                        <div className={styles["header"]}>
                            <h1>Horários</h1>
                            <a style={{cursor: "pointer"}} title="Salvar" onClick={salvarConfig}><img className={styles["icon-save"]} src={iconSave} alt="Botão de Salvar" /></a>
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
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[0] = novoArray[0] ? false : true;
                                    return novoArray;
                                })}>
                                    <img src={diasSemana[0] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>T</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[1] = novoArray[1] ? false : true;
                                    return novoArray;
                                })}>
                                <img src={diasSemana[1] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[2] = novoArray[2] ? false : true;
                                    return novoArray;
                                })}>
                                <img src={diasSemana[2] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[3] = novoArray[3] ? false : true;
                                    return novoArray;
                                })}>
                                <img src={diasSemana[3] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[4] = novoArray[4] ? false : true;
                                    return novoArray;
                                })}>
                                <img src={diasSemana[4] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
                                    const novoArray = [...prevState]; 
                                    novoArray[5] = novoArray[5] ? false : true;
                                    return novoArray;
                                })}>
                                <img src={diasSemana[5] ? botaoCheckColorido : botaoCheck} alt='Imagem de Certo' /></a>
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>D</h4>
                                <a style={{cursor: 'pointer'}} onClick={() => setDiasSemana(prevState => {
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
                        <h1>Serviços</h1>
                        <h5>Insira os serviços que sua oficina oferece</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" value={servicos} onChange={(e) => setServicos(e.target.value)} />
                        </div>
                        <div className={styles["box"]}></div>
                    </div>
                    <div className={styles["card-veiculos"]}>
                        <h1>Veículos</h1>
                        <h5>Selecione o(s) tipo(s) de veículo(s)</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" value={veiculos} onChange={(e) => setVeiculos(e.target.value)} />
                        </div>
                        <div className={styles["box"]}></div>
                    </div>
                </div>
                <div className='container-coluna'>
                    <div className={styles["card-marcas"]}>
                        <h1>Marcas</h1>
                        <h5>Insira as marcas nas quais sua oficina tem especialidade</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" onChange={(e) => filtrarMarca(e)} onKeyDown={(e) => addMarca(e)} />
                        </div>
                        <div className={styles["box"]}>
                            <div className={styles["box-tag"]}>
                            {marcasFiltradas.length !== 0 ? marcasFiltradas.map((item, index) => {
                                return <InputTag key={index} nome={item} onClick={() => deletarMarca(index)}/>
                            }) : marcas.map((item, index) => {
                                return <InputTag key={index} nome={item} onClick={() => deletarMarca(index)}/>
                            })}
                            </div>
                        </div>
                    </div>
                    <div className={styles["card-tipo-propulsao"]}>
                        <h1>Tipo de Propulsão</h1>
                        <h5>Selecione o(s) tipo(s) de propulsão dos veículo</h5>
                        <div className={styles["input-pesquisa"]}>
                            <div className={styles["img-lupa"]}><img src={lupaImg} alt="Imagem de Lupa" /></div>
                            <input type="text" value={tipoPropulsao} onChange={(e) => setTipoPropulsao(e.target.value)} />
                        </div>
                        <div className={styles["box"]}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfiguracoesMecanica;