import React from "react";
import style from "./Excluir.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

const Excluir = (endpoint) => {
    const navigate = useNavigate();
    const { idCliente } = useParams();

    const handleVoltar = () => {
        navigate("/clientes");
    }

    const handleExcluir = () => {
        try{
            api.delete(`/${endpoint}/${idCliente}`);
            navigate(`/${endpoint}`);
        } catch (error) {
            console.log("Erro foi esse aqui: ", error);
        }
    }

    return (
        <div className={style["body"]}>
            <div className={style["container"]}>
                <h1>Excluir</h1>
                <h4>Tem certeza que deseja excluir?</h4>
                <div className={style["botao"]}>
                    <a onClick={() => handleExcluir()}>Sim</a>
                    <a onClick={handleVoltar}>Não</a>
                </div>
            </div>
        </div>
    );
};

export default Excluir;
