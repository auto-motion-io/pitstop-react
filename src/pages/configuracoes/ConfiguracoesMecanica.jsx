import React, { useState } from 'react';
import styles from './ConfiguracoesMecanica.module.css';
import NavBar from '../../components/navbar/NavBar';
import botaoEditar from "./../../utils/assets/botao-editar.svg";
import Input from '../../components/input/Input';
import whatsappImg from "./../../utils/assets/whatsapp.svg";
import botaoCheck from "./../../utils/assets/botao-check.svg";
import botaoCheckColorido from "./../../utils/assets/botao-check-colorido.svg";
import relogioImg from "./../../utils/assets/relogio.svg";
import lupaImg from "./../../utils/assets/lupa.svg";
import MenuConfig from '../../components/menuConfig/MenuConfig';
import { inputMascaraTelefoneCelular } from '../../utils/global';

function ConfiguracoesMecanica() {
    const [whatsapp, setWhatsapp] = useState("");
    const [horarioSEntrada, setHorarioSEntrada] = useState("");
    const [horarioSSaida, setHorarioSSaida] = useState("");
    const [horarioFSEntrada, setHorarioFSEntrada] = useState("");
    const [horarioFSSaida, setHorarioFSSaida] = useState("");
    const [diasSemana, setDiasSemana] = useState("");
    const [servicos, setServicos] = useState("");
    const [veiculos, setVeiculos] = useState("");
    const [marcas, setMarcas] = useState("");
    const [tipoPropulsao, setTipoPropulsao] = useState("");

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={styles["container"]}>
                <MenuConfig ativo={2}/>
                <div className='container-coluna'>
                    <div className={styles["card-contato"]}>
                        <div className={styles["header"]}>
                            <h1>Contato</h1>
                            <img src={botaoEditar} alt="Botão de Editar" />
                        </div>
                        <div className={styles["whatsapp-input"]}>
                            <img src={whatsappImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={whatsapp} maxLength={15} onInput={inputMascaraTelefoneCelular} onChange={(e) => setWhatsapp(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles["card-horarios"]}>
                        <div className={styles["header"]}>
                            <h1>Horários</h1>
                            <img src={botaoEditar} alt="Botão de Editar" />
                        </div>
                        <h4>Semana</h4>
                        <div className={styles["semana-input"]}>
                            <img src={relogioImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={horarioSEntrada} onChange={(e) => setHorarioSEntrada(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={horarioSSaida} onChange={(e) => setHorarioSSaida(e.target.value)} />
                        </div>
                        <h4>Fim de Semana</h4>
                        <div className={styles["semana-input"]}>
                            <img src={relogioImg} alt="Imagem WhatsApp" />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={horarioFSEntrada} onChange={(e) => setHorarioFSEntrada(e.target.value)} />
                            <Input tamanho={"100%"} tamanhoFundo={"85%"} value={horarioFSSaida} onChange={(e) => setHorarioFSSaida(e.target.value)} />
                        </div>
                        <h1>Dias da Semana</h1>
                        <div className={styles["dias-semana"]}>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <img src={botaoCheckColorido} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>T</h4>
                                <img src={botaoCheckColorido} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <img src={botaoCheckColorido} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>Q</h4>
                                <img src={botaoCheckColorido} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <img src={botaoCheckColorido} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>S</h4>
                                <img src={botaoCheck} alt='Imagem de Certo' />
                            </div>
                            <div className={styles["dia-semana"]}>
                                <h4>D</h4>
                                <img src={botaoCheck} alt='Imagem de Certo' />
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
                            <input type="text" value={marcas} onChange={(e) => setMarcas(e.target.value)} />
                        </div>
                        <div className={styles["box"]}></div>
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