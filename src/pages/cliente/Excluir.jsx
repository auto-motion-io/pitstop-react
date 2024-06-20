import React from "react";
import style from "./Excluir.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const Excluir = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const endpoint = location.state.endpointExcluir;


    const handleVoltar = () => {
        if(endpoint === "/ordemDeServicos")
            navigate("/ordem-servico");
        else
        navigate(`${endpoint}`);
    }

    const handleExcluir = () => {
        try{
            api.delete(`${endpoint}/${id}`);
            setTimeout(() => {
                navigate(`${endpoint}`);
            }, 500);
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
                    <a onClick={handleExcluir}>Sim</a>
                    <a onClick={handleVoltar}>Não</a>
                </div>
            </div>
        </div>
    );
};

export default Excluir;
