import React from "react";
import ModalLogin from "../../components/modalLogin/ModalLogin";
import logoPitstop from "./../../utils/assets/pitstop logo colorido.svg";
import style from "./LoginPitstop.module.css"
import pista from "../../utils/assets/pista login.svg"


const LoginPitstop = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "8vh" }}>

      <div >
        <img style={{ position: "absolute", zIndex: "-1", right: "0", marginTop: "-20vh", bottom: 0, width: "70%" }} src={pista} alt="" />
        <ModalLogin logo={logoPitstop} nome1={"E-mail*"} nome2={"Senha"} tamanho1={"93%"} tamanho2={"93%"} tamanhoFundo1={"80%"} tamanhoFundo2={"80%"} cor={"#C66D2C"} />

        <div style={{ marginTop: "3vh" }}>
          <a id={style.textinho} style={{ marginLeft: "10vw" }} href="#">Ainda não tem login? Cadastre-se no PitStop </a>
        </div>


      </div>

    </div>

  )


};

export default LoginPitstop;