import React from 'react';
import styles from './Galeria.module.css';
import NavBar from '../../components/navbar/NavBar';
import MenuConfig from '../../components/menuConfig/MenuConfig';
import setaVoltar from '../../utils/assets/seta-voltar.svg';
import botaoAdd from '../../utils/assets/botao-add.svg';

function Galeria() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={styles["container"]}>
                <MenuConfig ativo={3} />
                <div className={styles["container-galeria"]}>
                    <div className={styles["img-seta"]}><img src={setaVoltar} alt="Imagem Voltar" /></div>
                    <h1>Galeria de Fotos</h1>
                    <h5>Insira aqui as fotos que aparecerão para os usuários do Buscar! quando procurarem por sua oficina</h5>
                    <div className={styles["fotos"]}>
                        <div className={styles["container-foto"]}></div>
                    </div>
                    <div className={styles["link-foto"]}>
                        <a></a>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                    <div className={styles["botao-add"]}>
                        <a><img src={botaoAdd} alt="Imagem do botão adicionar" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Galeria;