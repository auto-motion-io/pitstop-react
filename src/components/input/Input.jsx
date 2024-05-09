import React from "react";
import style from "./Input.module.css";

const Input = ({ nome, type = "text", tamanho, tamanhoFundo, onInput = null, onChange, maxLength = 255, value = "", altura = "36px", imagem = null }) => {
  let inputImage = "";
  if (image != null) {
    inputImage =
      <div className={style["input-lupa"]}>
        <div className={style["lupa"]}><img src={lupa} alt="Imagem de Lupa" /></div>
        <input type="text" />
      </div>
  }
  return (
    
    <div id={style.backgroundInput} style={{ width: tamanhoFundo }}>
      <span id={style.span}>{nome} </span>
      <input required type={type} id={style.input} value={value} maxLength={maxLength} onInput={onInput} onChange={onChange} style={{ width: tamanho, height: altura }} />
    </div>

  );
};

export default Input;