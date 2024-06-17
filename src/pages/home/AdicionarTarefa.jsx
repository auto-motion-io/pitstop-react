import React from "react";
import style from "./AdicionarTarefa.module.css";
import Input from "../../components/input/Input";
import Botao from "../../components/botao/Botao"
import { useNavigate } from 'react-router-dom';


const AdicionarTarefa = () => {
    const navigate = useNavigate();
    const handleNavigate = () => {
      navigate(`/home`);
  }

    return (
        <div className={style["body"]}>
        <div className={style["container"]}>
            <div className={style["titulo"]}>
                <h1>Nova Tarefa</h1>
            </div>
            <div className={style["inputs"]}>
            <Input nome={"Nome da Tarefa*"} tipo={"text"} value={""} tamanho={"230%"} />
            <Input nome={"Data*"} type={"date"} value={""} tamanho={"100%"} />
            </div>

            <div className={style["botao"]}>
            <Botao onClick={handleNavigate} nome={"Voltar"} cor={"#DFDEDB"} corFont={"#474747"}/>
            <Botao nome={"Cadastrar"} cor={"#C66D2C"} value={""} tamanho={"230%"}/>
            </div>
        </div>
    </div>
    )


}

export default AdicionarTarefa;