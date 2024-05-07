import React from "react";
import style from "./Alignner.module.css";

const Alignner = ({ children }) => {
  return (
    <div className={style.container}>
      {children}
    </div>
  );
};

export default Alignner;
