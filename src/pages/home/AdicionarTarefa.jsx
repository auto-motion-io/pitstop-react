import React, { useState } from "react";
import style from "./AdicionarTarefa.module.css";
import Input from "../../components/input/Input";
import Botao from "../../components/botao/Botao";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../services/api";

const AdicionarTarefa = () => {
    const navigate = useNavigate();
    const [nomeTarefa, setNomeTarefa] = useState("");
    const [dataTarefa, setDataTarefa] = useState("");
    const idOficina = sessionStorage.getItem("idOficina");

    const handleNavigate = () => {
        navigate(`/home`);
    }

    const handleCadastro = async () => {
        try {
            const response = await api.post("/tarefas", {
                descricao: nomeTarefa,
                dtDeadline: dataTarefa,
                status: "Pendente",
                fkOficina: parseInt(idOficina), // Converte para inteiro se necessário
            });
            console.log("Tarefa cadastrada:", response.data);
            notifyCadastro(); // Chama a função para exibir o toast de sucesso
            // Após o cadastro bem-sucedido, navegue de volta para a página inicial
        } catch (error) {
            console.error("Erro ao cadastrar tarefa:", error);
            notifyError(); // Chama a função para exibir o toast de erro
        }
    }

    const notifyCadastro = () => {
        toast.success('Tarefa cadastrada com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = () => {
        toast.error('Erro ao cadastrar tarefa. Verifique os dados e tente novamente.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className={style["body"]}>
            <ToastContainer />
            <div className={style["container"]}>
                <div className={style["titulo"]}>
                    <h1>Nova Tarefa</h1>
                </div>
                <div className={style["inputs"]}>
                    <Input
                        nome={"Nome da Tarefa*"}
                        tipo={"text"}
                        value={nomeTarefa}
                        onChange={(e) => setNomeTarefa(e.target.value)}
                        tamanho={"230%"}
                    />
                    <Input
                        nome={"Data*"}
                        type={"date"}
                        value={dataTarefa}
                        onChange={(e) => setDataTarefa(e.target.value)}
                        tamanho={"100%"}
                    />
                </div>

                <div className={style["botao"]}>
                    <Botao onClick={handleNavigate} nome={"Voltar"} cor={"#DFDEDB"} corFont={"#474747"} />
                    <Botao onClick={handleCadastro} nome={"Cadastrar"} cor={"#C66D2C"} tamanho={"230%"} />
                </div>
            </div>
        </div>
    );
}

export default AdicionarTarefa;