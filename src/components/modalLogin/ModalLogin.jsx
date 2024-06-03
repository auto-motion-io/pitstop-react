import React, { useState } from "react";
import style from "./ModalLogin.module.css";
import Input from "../input/Input";
import Botao from "../botao/Botao";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ModalLogin = ({ logo, nome1, tamanho1, tamanhoFundo1, nome2, tamanho2, tamanhoFundo2, cor }) => {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  async function logar() {
    const valorLogin = {
      email: email,
      senha: senha
    }
    try {
      await api.post(`/gerentes/login`, valorLogin).then((response) => {
        login(response.data.token, response.data.oficina.id, email);
        toast.success("Logado com sucesso!", { autoClose: 3000 });
        return {
          email: email,
          senha: senha
        };
      });
    } catch (error) {
      console.log("Erro foi esse aqui: " + error)
      handleLoginError(error);
      return false;
    }
    return true;
  }

  async function verificarLogin() {
    let logado = await logar();
    if (logado) {
      navigate("/home");
    }
  }

  function handleLoginError(error){
    if(error == null || error.response == null){
      toast.error("Ocorreu um erro ao fazer login por favor, tente novamente.", { autoClose: 3000 });
      return;
    }
    if(error.response.status === 401 || error.response.status === 403){
      toast.error("Email ou senha inválidos", { autoClose: 3000 });
      return;
    }
    toast.error("Ocorreu um erro ao fazer login por favor, tente novamente.", { autoClose: 3000 });
  }

  return (
    <>
      <div id={style.backgroundModal}>
        <div id={style.divLogo}>
          <img src={logo} alt="logo" id={style.logoModal} />
        </div>

        <div id={style.backgroundLabels}>
          <Input nome={nome1} value={email} onChange={(e) => setEmail(e.target.value)} tamanho={tamanho1} tamanhoFundo={tamanhoFundo1} />
          <Input nome={nome2} type={"password"} value={senha} onChange={(e) => setSenha(e.target.value)} tamanho={tamanho2} tamanhoFundo={tamanhoFundo2} />
        </div>
        <div>
          <a id={style.textinho} style={{ width: "87%", display: "flex", alignItems: "end", justifyContent: "end" }} href="#">Esqueci minha senha</a>
        </div>
        <div style={{ width: '100%', display: "flex", justifyContent: "center", marginTop: "5vh" }}>
          <Botao nome={"Entrar"} onClick={verificarLogin} cor={cor} />
        </div>

      </div>


    </>
  );
};

export default ModalLogin;
