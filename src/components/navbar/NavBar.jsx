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

const NavBar = ({currentPage}) => {
  var navigate = useNavigate();

  function mudarPagina(pagina) {
    navigate(pagina);
  }

  async function getUsuario() {
    try {
      await api.get(`/gerentes/`).then((response) => {
        console.log(response.data)
        return response.data;
      });
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return false;
    }
  }

  return (
    <div className={styles["container"]}>
      <nav>
        <div className={styles["logo"]}>
          <img src={logo} alt="Logo" style={{ height: "75%" }} />
        </div>
        <div className={styles["menu"]}>
          <span onClick={() => {mudarPagina("/home")}} className={currentPage === "home" ? styles["active"] : styles["teste"]}>
            <img src={imgHome} alt="Home" />
          </span>
          <span onClick={() => {mudarPagina("/clientes")}} id="clientes" className={currentPage === "clientes" ? styles["active"] : styles["teste"]}>
            <img src={imgCliente} alt="Clientes" />
          </span>
          <span onClick={() => {mudarPagina("/servicos")}} id="servicos" className={currentPage === "servicos" ? styles["active"] : styles["teste"]}>
            <img src={imgServico} alt="Serviços" />
          </span>
          <span onClick={() => {mudarPagina("/estoque")}} id="estoque" className={currentPage === "estoque" ? styles["active"] : styles["teste"]}>
            <img src={imgEstoque} alt="Estoque" />
          </span>
          <span onClick={() => {mudarPagina("/ordem")}} id="os" className={currentPage === "os" ? styles["active"] : styles["teste"]}>
            <img src={imgOS} alt="Ordem de serviço" />
          </span>
          <span onClick={() => {mudarPagina("/financeiro")}} id="financeiro" className={currentPage === "financeiro" ? styles["active"] : styles["teste"]}>
            <img src={imgFinanceiro} alt="Financeiro" />
          </span>
          <span onClick={() => {mudarPagina("/configuracoes")}} id="configuracoes" className={currentPage === "configuracoes" ? styles["active"] : styles["teste"]}>
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
