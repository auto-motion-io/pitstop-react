import React from "react";
import styles from "./NavBar.module.css"
import imgHome from "../../utils/assets/home.svg"
import imgCliente from "../../utils/assets/perfil.svg"
import imgServico from "../../utils/assets/maleta.svg"
import imgEstoque from "../../utils/assets/ferramenta.svg"
import imgOS from "../../utils/assets/arquivo.svg"
import imgFinanceiro from "../../utils/assets/cifrao.svg"
import imgConfig from "../../utils/assets/engrenagem.svg"
import logo from "../../utils/assets/logo.png"
import gerente from "../../utils/assets/gerente.svg"
const NavBar = () => {
    return (
        <nav>
            <div className={styles["logo"]}>
                <img src={logo} alt="Logo" style={{height:"75%"}} />
            </div>
            <div className={styles["menu"]}>
                <span><img src={imgHome} alt="Home" /></span>
                <span><img src={imgCliente} alt="Clientes" /></span>
                <span><img src={imgServico} alt="Serviços"  /></span>
                <span><img src={imgEstoque} alt="Estoque" /></span>
                <span><img src={imgOS} alt="Ordem de serviço" /></span>
                <span><img src={imgFinanceiro} alt="Financeiro" /></span>
                <span><img src={imgConfig} alt="Configurações" /></span>
            </div>
            <div className={styles["perfil"]}>
                <div className={styles["foto-perfil"]}>
                    <img src={gerente} alt="Foto de perfil" className={styles["img-perfil"]} />
                </div>
                <div className={styles["infos"]}>
                    <span className={styles["nome"]}>Bom dia!</span>
                    <span className={styles["oficina"]}>Mário</span>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;