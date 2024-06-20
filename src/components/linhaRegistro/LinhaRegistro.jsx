import React from "react";
import style from "./LinhaRegistro.module.css";
import editar from "../../utils/assets/editar.svg";
import visualizar from "../../utils/assets/visualizar.svg"; 
import excluir from "../../utils/assets/lixeira.svg";
import { useNavigate } from "react-router-dom";

const LinhaRegistro = ({ endpoint, registros }) => {

    const navigate = useNavigate();

    const handleEditar = (id) => {
        navigate(`${endpoint}/editar/${id}`);
        window.location.reload();
    }

    const handleVisualizar = (token) => {
        navigate(`${endpoint}/visualizar/${token}`);
    }

    const handleExcluir = (id) => {
        navigate(`${endpoint}/excluir/${id}`, { state: { endpointExcluir: endpoint } });
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("pt-BR");
    }

    const linhas = registros.map((registro, index) => (
        <div className={style["container"]} key={index}>
            <div className={style["linha"]}>
                {Object.entries(registro).slice(1).map(([key, value]) => (
                    key !== "token" ? (
                        key.includes("data") ? (
                            <div className={style["coluna"]} key={key}>
                                <span>{formatDate(value)}</span>
                            </div>
                        ) : (
                            <div className={style["coluna"]} key={key}>
                                <span>{value}</span>
                            </div>
                        )
                    ) : null
                ))}
                <div className={style["coluna"]}>
                    <div className={style["botoes"]}>
                        <a id={registro.idServico} onClick={() => endpoint != "/ordemDeServicos" ? handleEditar(registro.id) : handleVisualizar(registro.token)}><img src={endpoint == "/ordemDeServicos" ? visualizar : editar} alt="Botão Editar" /></a>
                        <a onClick={() => handleExcluir(registro.id)}><img src={excluir} alt="Botão Excluir" /></a>
                    </div>
                </div>
            </div>
        </div>
    ));

    const linhasEstoque = registros.map((registro, index) => (
        <div className={style["container"]} key={index}>
            <div className={style["linha"]}>
                <div className={style["coluna"]}><span>{registro.nome}</span></div>
                <div className={style["coluna"]}><span>{registro.quantidade}</span></div>
                <div className={style["coluna"]}><span>{registro.localizacao}</span></div>
                <div className={style["coluna"]}><span>{registro.valorVenda}</span></div>
                <div className={style["coluna"]}><span>{registro.garantia}</span></div>
                <div className={style["coluna"]}>
                    <div className={style["botoes"]}>
                        <a id={registro.idServico} onClick={() => handleEditar(registro.id)}><img src={editar} alt="Botão Editar" /></a>
                        <a onClick={() => handleExcluir(registro.id)}><img src={excluir} alt="Botão Excluir" /></a>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className={style["box"]}>
            {endpoint == "/produtoEstoque" ? linhasEstoque : linhas}
        </div>
    );
};

export default LinhaRegistro;
