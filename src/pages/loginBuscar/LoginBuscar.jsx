import React from "react";
import style from "./LoginBuscar.module.css";
import ModalLogin from "../../components/modalLogin/ModalLogin";
import logoBuscar from "../../utils/assets/logo buscar colorido.svg";
import ferramentas from "../../utils/assets/ferramentas buscar.svg";
const LoginBuscar = () => {
  return (
    <div style={{ display: "flex", width: "100%", margin: "0", padding: "0"}}>
      <div style={{width: "60%", display: "flex", alignItems: "center", flexDirection: "column", marginTop: "7vh"}}>
        <div>
          <ModalLogin
            logo={logoBuscar}
            nome1={"E-mail*"}
            nome2={"Senha"}
            tamanho1={"93%"}
            tamanho2={"93%"}
            tamanhoFundo1={"80%"}
            tamanhoFundo2={"80%"}
            cor={"#3B563C"}
          />
        </div>

        <div style={{ marginTop: "3vh", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <a id={style.textinho} href="#">
            Sem login? Cadastre-se
          </a>
        </div>
      </div>

      <div>
        <img
          style={{
            position: "absolute",
            zIndex: "-1",
            right: "0",
            marginTop: "-20vh",
            bottom: 0,
            width: "30%",
          }}
          src={ferramentas}
          alt=""
        />
        <div style={{width: "80%", marginTop: "10vh", marginLeft: "-5vw" }}>
        <span id={style.textao}>Onde a busca ganha velocidade.</span>
        </div>
      </div>
    </div>
  );
};

export default LoginBuscar;
