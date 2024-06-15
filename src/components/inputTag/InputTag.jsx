import React from "react";
import styles from "./InputTag.module.css";
import deleteInputTag from "./../../utils/assets/icon-delete-input.png";

const InputTag = ({nome, onClick}) => {

  return (
    <>
      <div className={styles["background-input"]}>
        <span className={styles["span-input-tag"]}>{nome} </span>
        <a onClick={onClick}><img className={styles["img-deletar"]} src={deleteInputTag} alt="Botão com um x de deletar" /></a>
      </div>
    </>
  );
};

export default InputTag;