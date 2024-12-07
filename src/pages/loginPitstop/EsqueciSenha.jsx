import React, { useState } from "react";
import Input from "../../components/input/Input";
import styles from "./EsqueciSenha.module.css";
import Botao from "../../components/botao/Botao";
import pitstopLogo from "../../utils/assets/pitstop logo colorido.svg";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EsqueciSenha = () => {
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleNext() {
    sessionStorage.setItem("email", email);
    api.post("/gerentes/set-token?op=senha", {
      email: email
    }).then((response) => {
      setNext(true);
      toast.success('E-mail enviado com sucesso!');
    }).catch((error) => {
      console.log("Erro foi esse aqui: ", error);
      toast.error('Erro ao enviar e-mail!');
    });
  }

  async function handleEnviar() {
    api.post("/gerentes/confirmar-token?op=senha", {
      email: email,
      token: token,
      senha: senha
    }).then((response) => {
      sessionStorage.removeItem("email");
      toast.success('Senha alterada com sucesso!');
      navigate("/")
    }).catch((error) => {
      console.log("Erro foi esse aqui: ", error);
      toast.error('Erro ao alterar senha!');
    });
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["container-box"]}>
        <div className={styles["titulo"]}>
          <h1>Recuperar Senha</h1>
          <h4>Informe seu e-mail e te enviaremos uma mensagem para recuperação</h4>
        </div>
        <div className={styles["box"]}>
          {next ? (
            <div className={styles["box-inputs"]}>
              <Input nome={"Token*"} value={token} onChange={(e) => setToken(e.target.value)} tamanho={"100%"} tamanhoFundo={"100%"}  corBackground="#f1efe9"/>
              <Input nome={"Nova Senha*"} type={"password"} tamanho={"100%"} value={senha} onChange={(e) => setSenha(e.target.value)} tamanhoFundo={"100%"} corBackground="#f1efe9" />
            </div>
          ) : (
            <div className={styles["box-inputs"]}>
              <Input nome={"E-mail*"} type={"e-mail"} value={email} onChange={(e) => setEmail(e.target.value)} tamanho={"100%"} tamanhoFundo={"100%"} corBackground="#f1efe9"/>
            </div>
          )}
          <div className={styles["button"]}>
            <Botao nome={"Enviar"} onClick={(next === false ? handleNext : handleEnviar)} type={"submit"} cor={"#C66D2C"} tamanho={"100%"} tamanhoFonte={"1.5rem"} />
          </div>
        </div>
      <div className={styles["logo"]}><img src={pitstopLogo} alt="Logo do PitStop" /></div>
      </div>
    </div>
  );
};

export default EsqueciSenha;