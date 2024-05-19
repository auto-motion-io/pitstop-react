import React from "react";
import style from "./Input.module.css";

const Input = ({ nome, type = "text", tamanho, tamanhoFundo, onInput = null, onChange, maxLength = 255, value = "", altura = "5vh", imagem = null, corBackground = "#DFDEDB" }) => {
  let inputImage = "";
  if (imagem != null) {
    inputImage =
      <div className={style["input-img"]} style={{width: tamanhoFundo}}>
        <div className={style["img"]} style={{backgroundColor : corBackground}}><img src={imagem} alt="Imagem de Lupa" /></div>
        <input type="text" style={{backgroundColor : corBackground, width : tamanho}}  />
      </div>
  } else {
    inputImage =

      <input type={type} id={style.input} value={value} maxLength={maxLength} onInput={onInput} onChange={onChange} style={{ width: tamanho, height: altura, backgroundColor : corBackground }} />
  }
  return (
    <>
      <div id={style.backgroundInput} style={{ width: tamanhoFundo }}>
        <span id={style.span}>{nome} </span>
        {inputImage}
      </div>
    </>
  );
};

export default Input;