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
  const {page} = props; 
  console.log(props.page)

    const receberValor = (valor) => {
        if (valor === "home") {
            return true;
        }
    }

  return (
    <nav>
      <div className={styles["logo"]}>
        <img src={logo} alt="Logo" style={{ height: "75%" }} />
      </div>
      <div className={styles["menu"]}>
        <span className={receberValor("home") ? styles["active"] : styles["teste"]}>
          <img src={imgHome} alt="Home" />
        </span>
        {/* <span id="clientes" className={currentPage === "clientes" ? styles["active"] : ""}>
          <img src={imgCliente} alt="Clientes" />
        </span>
        <span id="servicos" className={currentPage === "servicos" ? styles["active"] : ""}>
          <img src={imgServico} alt="Serviços" />
        </span>
        <span id="estoque" className={currentPage === "estoque" ? styles["active"] : ""}>
          <img src={imgEstoque} alt="Estoque" />
        </span>
        <span id="os" className={currentPage === "os" ? styles["active"] : ""}>
          <img src={imgOS} alt="Ordem de serviço" />
        </span>
        <span id="financeiro" className={currentPage === "financeiro" ? styles["active"] : ""}>
          <img src={imgFinanceiro} alt="Financeiro" />
        </span>
        <span id="configuracoes" className={currentPage === "configuracoes" ? styles["active"] : ""}>
          <img src={imgConfig} alt="Configurações" />
        </span> */}
      </div>
      <div className={styles["perfil"]}>
        <div className={styles["foto-perfil"]}>
          <img src={gerente} alt="Foto de perfil" className={styles["img-perfil"]} />
        </div>
        <div className={styles["infos"]}>
          <span className={styles["nome"]}>Bom dia,</span>
          <span className={styles["oficina"]}>Mário!</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;