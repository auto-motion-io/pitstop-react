import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import imgHome from "../../utils/assets/home.svg";
import imgCliente from "../../utils/assets/perfil.svg";
import imgEstoque from "../../utils/assets/maleta.svg";
import imgServico from "../../utils/assets/ferramenta.svg";
import imgOS from "../../utils/assets/arquivo.svg";
import imgFinanceiro from "../../utils/assets/cifrao.svg";
import imgConfig from "../../utils/assets/engrenagem.svg";
import logo from "../../utils/assets/logo.png";
import gerente from "../../utils/assets/gerente.svg";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const NavBar = ({ currentPage }) => {
  const [nomeUser, setNomeUser] = useState("");
  var navigate = useNavigate();

  function mudarPagina(pagina) {
    navigate(pagina);
  }

  function handleUsuario() {
    api.get("/gerentes").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        debugger
        console.log(response.data[i].oficina.id);
        console.log(sessionStorage.getItem("idOficina"));
        if (response.data[i].oficina.id.toString() === sessionStorage.getItem("idOficina") && response.data[i].email === sessionStorage.getItem("email")) {
          setNomeUser(response.data[i].nome + " " + response.data[i].sobrenome);
          console.log(response.data[i].nome + " " + response.data[i].sobrenome);
        }
      }
    });
  }

  useEffect(() => {
    handleUsuario();
  }, []);

  const pageClasses = {
    home: currentPage === "home" ? styles.active : "",
    clientes: currentPage === "clientes" ? styles.active : "",
    servicos: currentPage === "servicos" ? styles.active : "",
    estoque: currentPage === "estoque" ? styles.active : "",
    os: currentPage === "os" ? styles.active : "",
    financeiro: currentPage === "financeiro" ? styles.active : "",
    configuracoes: currentPage === "configuracoes" ? styles.active : "",
  };

  return (
    <div className={styles.container}>
      <nav>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" style={{ height: "75%" }} />
        </div>
        <div className={styles.menu}>
          <span onClick={() => mudarPagina("/home")} className={pageClasses.home}>
            <img src={imgHome} alt="Home" />
          </span>
          <span onClick={() => mudarPagina("/clientes")} className={pageClasses.clientes}>
            <img src={imgCliente} alt="Clientes" />
          </span>
          <span onClick={() => mudarPagina("/servicos")} className={pageClasses.servicos}>
            <img src={imgServico} alt="Serviços" />
          </span>
          <span onClick={() => mudarPagina("/produtoEstoque")} className={pageClasses.estoque}>
            <img src={imgEstoque} alt="Estoque" />
          </span>
          <span onClick={() => {mudarPagina("/ordem-servico")}} id="os" className={currentPage === "os" ? styles["active"] : styles["teste"]}>
            <img src={imgOS} alt="Ordem de serviço" />
          </span>
          <span onClick={() => mudarPagina("/financeiro")} className={pageClasses.financeiro}>
            <img src={imgFinanceiro} alt="Financeiro" />
          </span>
          <span onClick={() => mudarPagina("/configuracoes")} className={pageClasses.configuracoes}>
            <img src={imgConfig} alt="Configurações" />
          </span>
        </div>
        <div className={styles.perfil}>
          <div className={styles["foto-perfil"]}>
            <img src={gerente} alt="Foto de perfil" className={styles["img-perfil"]} />
          </div>
          <div className={styles.infos}>
            <span className={styles.nome}>Boa Tarde!</span>
            <span className={styles.oficina}>{nomeUser}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;