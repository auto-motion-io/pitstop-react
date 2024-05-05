import React, { useState } from "react";
import styles from "./NavBar.module.css";
import imgHome from "../../utils/assets/home.svg";
import imgCliente from "../../utils/assets/perfil.svg";
import imgServico from "../../utils/assets/maleta.svg";
import imgEstoque from "../../utils/assets/ferramenta.svg";
import imgOS from "../../utils/assets/arquivo.svg";
import imgFinanceiro from "../../utils/assets/cifrao.svg";
import imgConfig from "../../utils/assets/engrenagem.svg";
import logo from "../../utils/assets/logo.png";
import gerente from "../../utils/assets/gerente.svg";

const NavBar = (props) => {
  const { page } = props;
  console.log(props.page)

  const receberValor = (valor) => {
    if (valor === "home") {
      return true;
    }
  }

  var currentPage = "configuracoes"

  return (
    <div className={styles["container"]}>
      <nav>
        <div className={styles["logo"]}>
          <img src={logo} alt="Logo" style={{ height: "75%" }} />
        </div>
        <div className={styles["menu"]}>
          <span className={currentPage === "home" ? styles["active"] : styles["teste"]}>
            <img src={imgHome} alt="Home" />
          </span>
          <span id="clientes" className={currentPage === "clientes" ? styles["active"] : styles["teste"]}>
            <img src={imgCliente} alt="Clientes" />
          </span>
          <span id="servicos" className={currentPage === "servicos" ? styles["active"] : styles["teste"]}>
            <img src={imgServico} alt="Serviços" />
          </span>
          <span id="estoque" className={currentPage === "estoque" ? styles["active"] : styles["teste"]}>
            <img src={imgEstoque} alt="Estoque" />
          </span>
          <span id="os" className={currentPage === "os" ? styles["active"] : styles["teste"]}>
            <img src={imgOS} alt="Ordem de serviço" />
          </span>
          <span id="financeiro" className={currentPage === "financeiro" ? styles["active"] : styles["teste"]}>
            <img src={imgFinanceiro} alt="Financeiro" />
          </span>
          <span id="configuracoes" className={currentPage === "configuracoes" ? styles["active"] : styles["teste"]}>
            <img src={imgConfig} alt="Configurações" />
          </span>
        </div>
        <div className={styles["perfil"]}>
          <div className={styles["foto-perfil"]}>
            <img src={gerente} alt="Foto de perfil" className={styles["img-perfil"]} />
          </div>
          <div className={styles["infos"]}>
            <span className={styles["nome"]}>Marcos Gonzales</span>
            <span className={styles["oficina"]}>Auto Milton!</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
