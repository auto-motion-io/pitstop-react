import React from "react";
import styles from "./Tarefa.module.css";
import Lixeira from "../../utils/assets/lixeira.svg";
import Calendario from "../../utils/assets/calendario-laranja.svg";
import Check from "../../utils/assets/botao-check-colorido.svg";
import api from "../../services/api";
import CheckCinza from "../../utils/assets/checkcinza.svg";

const Tarefa = ({ tarefas = [], setTarefas }) => {
    const handleToggleStatus = async (id) => {
        try {
            const tarefaToUpdate = tarefas.find(tarefa => tarefa.id === id);
            if (!tarefaToUpdate) return;

            const newStatus = tarefaToUpdate.status === "Pendente" ? "Concluída" : "Pendente";
            const response = await api.put(`/tarefas/${id}`, { status: newStatus });
            
            // Atualiza localmente a tarefa com o novo status
            setTarefas(tarefas.map(tarefa => tarefa.id === id ? { ...tarefa, status: newStatus } : tarefa));
        } catch (error) {
            console.error("Erro ao atualizar status da tarefa:", error);
        }
    };

    const truncateDescription = (description) => {
        if (description.length > 40) {
            return description.substring(0, 40) + "...";
        }
        return description;
    };

    const handleDeleteTarefa = async (id) => {
        try {
            await api.delete(`/tarefas/${id}`);
            // Atualizar localmente removendo a tarefa deletada
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    return (
        <>
            {Array.isArray(tarefas) && tarefas.map(tarefa => (
                <div key={tarefa.id} className={styles.container}>
                    <div className={styles.lixeira}>
                        <a href="#" onClick={() => handleDeleteTarefa(tarefa.id)}>
                            <img src={Lixeira} alt="" width={"15px"} />
                        </a>
                    </div>

                    <div className={styles.calendario}>
                        <div className={styles.data}>
                            <img src={Calendario} alt="" />
                            <span>{formatDate(tarefa.dtDeadline)}</span>
                        </div>
                    </div>

                    <div className={styles.nome}>
                        <div className={styles.nome_check}>
                            <h2 style={{ fontSize: "25px" }}>{truncateDescription(tarefa.descricao)}</h2>
                            <a href="#" onClick={() => handleToggleStatus(tarefa.id)}>
                                <img src={tarefa.status === "Pendente" ? CheckCinza : Check} alt="" width={"30px"} />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
};

export default Tarefa;