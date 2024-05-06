
import React from "react";
import style from "./Botao.module.css"

const Botao = ({nome, cor, onClick = null}) => {
  return (
    <button id={style.botao} onClick={onClick} style={{backgroundColor: cor}}>{nome}</button>
  );
};

export default Botao;