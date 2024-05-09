import React from "react";
import style from "./Input.module.css";

const Input = ({ nome, type = "text", tamanho, tamanhoFundo, onInput = null, onChange, maxLength = 255, value = "", altura = "36px" }) => {
  return (
      <div id={style.backgroundInput} style={{width: tamanhoFundo}}>
        <span id={style.span}>{nome} </span>
        <input required type={type} id={style.input} value={value} maxLength={maxLength} onInput={onInput} onChange={onChange} style={{width: tamanho, height: altura}}/>
      </div>

  );
};

export default Input;