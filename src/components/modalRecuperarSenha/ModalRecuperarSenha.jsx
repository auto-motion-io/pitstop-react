import React from "react";
import style from "./ModalRecuperarSenha.module.css";
import Input from "../input/Input";
import Botao from "../botao/Botao";

const ModalRecuperarSenha = ({}) => {
  return (
    <div>
      <div id={style.divTexto}>
        <span id={style.textao}>Recuperar Senha</span>
        <span id={style.textinho}>
          Informe seu e-mail e te enviaremos uma mensagem para recuperação
        </span>
      </div>

      <div id={style.backgroundModal}>
        <div id={style.backgroundLabels}>
          <Input nome={"E-mail"} tamanho={"90%"} tamanhoFundo={"85%"} />
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "2vh",
          }}
        >
          <Botao nome={"Enviar"} cor={"#C66D2C"} />
        </div>
      </div>
    </div>
  );
};

export default ModalRecuperarSenha;
