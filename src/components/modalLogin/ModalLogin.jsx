
import React from "react";
import style from "./ModalLogin.module.css";
import Input from "../input/Input";
import Botao from "../botao/Botao";

const ModalLogin = ({ logo, nome1, tamanho1, tamanhoFundo1, nome2, tamanho2, tamanhoFundo2, cor }) => {
  return (
    <>
      <div id={style.backgroundModal}>
        <div id={style.divLogo}>
          <img src={logo} alt="logo" id={style.logoModal} />
        </div>

        <div id={style.backgroundLabels}>
          <Input nome={nome1} tamanho={tamanho1} tamanhoFundo={tamanhoFundo1} />
          <Input nome={nome2} tamanho={tamanho2} tamanhoFundo={tamanhoFundo2} />
        </div>
        <div>
          <a id={style.textinho} style={{ width: "87%", display: "flex", alignItems: "end", justifyContent: "end" }} href="#">Esqueci minha senha</a>
        </div>
        <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "5vh" }}>
          <Botao nome={"Entrar"} cor={cor} />
        </div>

      </div>


    </>
  );
};

export default ModalLogin;
