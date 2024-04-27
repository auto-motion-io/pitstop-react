
import React from "react";
import style from "./Botao.module.css"

const Botao = ({nome, cor}) => {
  return (
    <button id={style.botao} style={{backgroundColor: cor}}>{nome}</button>
  );
};

export default Botao;