import React from "react";
import style from "./Input.module.css";

const Input = ({ nome, tamanho, tamanhoFundo }) => {
  return (
      <div id={style.backgroundInput} style={{width: tamanhoFundo}}>
        <span id={style.span}>{nome} </span>
        <input required type="email" id={style.input} style={{width: tamanho}}/>
      </div>

  );
};

export default Input;