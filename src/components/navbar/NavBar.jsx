import React from "react";
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
import api from "../../api";

const NavBar = ({ currentPage }) => {
  var navigate = useNavigate();

  function mudarPagina(pagina) {
    navigate(pagina);
  }

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
          <span onClick={() => mudarPagina("/estoque")} className={pageClasses.estoque}>
            <img src={imgEstoque} alt="Estoque" />
          </span>
          <span onClick={() => mudarPagina("/ordem")} className={pageClasses.os}>
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
            <span className={styles.nome}>Marcos Gonzales</span>
            <span className={styles.oficina}>Auto Milton!</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;