import React from "react";
import style from "./RecuperarSenhaPitstop.module.css";
import ModalRecuperarSenha from "../../components/modalRecuperarSenha/ModalRecuperarSenha";
import logoPitstop from "../../utils/assets/pitstop logo colorido.svg";
import pista from "../../utils/assets/pista login.svg";

const RecuperarSenhaPitstop = () => {
  return (
    <div style={{ display: "flex", width: "100%",  }}>
      <div
        style={{
          width: "29%",
          display: "flex",
          height: "auto",
          alignItems: "end",
          marginTop: "37%",
          paddingLeft: "4vw"
        }}
      >
        <img src={logoPitstop} style={{ width: "25%",  }} alt="logoPitstop" />
      </div>

      <div>
        <img style={{position: "absolute", zIndex: "-1", right: "0", marginTop: "-20vh", bottom: 0, width: "65%"}} src={pista} alt="" /> 
        <div style={{marginTop: "15vh"}}>
        <ModalRecuperarSenha />

        </div>
      </div>
    </div>
  );
};

export default RecuperarSenhaPitstop;
