
import React from "react";
import style from "./Botao.module.css"

const Botao = ({nome, cor, corFont = "#F1EFE9", onClick = null}) => {
  return (
    <button id={style.botao} onClick={onClick} style={{backgroundColor: cor, color: corFont}}>{nome}</button>
  );
};

export default Botao;