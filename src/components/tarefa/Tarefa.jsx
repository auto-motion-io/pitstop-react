import React from "react";
import styles from "./Tarefa.module.css";
import Lixeira from "../../utils/assets/lixeira.svg"
import Calendario from "../../utils/assets/calendario-laranja.svg"
import Check from "../../utils/assets/botao-check-colorido.svg"


const Tarefa = ({}) => {
    return (
     <div className={styles.container}>
        <div className={styles.lixeira}> 
            <img src={Lixeira} alt="" width={"15px"} />
        </div>

        <div className={styles.calendario}>
            <div className={styles.data}>
                <img src={Calendario} alt="" />
                <span>09/5</span>
            </div>
        </div>

        <div className={styles.nome}>
        <div className={styles.nome_check}>
            <h2 style={{fontSize:"30px"}}>Ligar Cliente</h2>
            <img src={Check} alt="" width={"35px"} />
        </div>

        </div>

     </div>
    );
  };
  
  export default Tarefa;