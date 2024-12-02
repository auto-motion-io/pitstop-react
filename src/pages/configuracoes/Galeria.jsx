import React, { useState } from "react";
import styles from "./Galeria.module.css";
import NavBar from "../../components/navbar/NavBar";
import MenuConfig from "../../components/menuConfig/MenuConfig";
import setaVoltar from "../../utils/assets/seta-voltar.svg";
import botaoAdd from "../../utils/assets/botao-add.svg";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import api from "../../services/api";

function Galeria() {
  let imagem = atob(sessionStorage.getItem("imgOficina")) || "";

  const supabaseUrl = "https://jeyoqssrkcibrvhoobsk.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpleW9xc3Nya2NpYnJ2aG9vYnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MzYzOTMsImV4cCI6MjAyOTExMjM5M30.laseDYQK0WEdEY764voRE3nZMOqwqMth2mdVyJHO4wU";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleFileChange = (e) => {
    uploadImage(e.target.files[0]);
  };

  async function uploadImage(file) {
    const fileName = file.name.split(".").slice(0, -1).join(".");
    const filePath = `fotosOficina/${Date.now() + fileName}.png`;
    const { error } = await supabase.storage
      .from("ofc-photos")
      .upload(filePath, file);
    if (error) {
      toast.error("Erro ao atualizar imagem " + error.message);
      return;
    }

    const publicUrl = supabase.storage.from("ofc-photos").getPublicUrl(filePath)
      .data.publicUrl;

    await api
      .put(`/oficinas/atualiza-foto/${sessionStorage.getItem("idOficina")}`, {
        url: publicUrl,
      })
      .then((response) => {
        console.log(response);
        sessionStorage.setItem('imgOficina',btoa(publicUrl));
        toast.success(
          "Imagem alterada com sucesso, atualizando em 2 segundos",
          {
            autoClose: 1900,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        console.error("Erro ao atualizar imagem: " + e);
        toast.error("Erro ao atualizar imagem!" + e);
      });
  }

  return (
    <div>
      <div>
        <NavBar currentPage={"configuracoes"} />
      </div>
      <div className={styles["container"]}>
        <MenuConfig ativo={3} />
        <div className={styles["container-galeria"]}>
          <div className={styles["img-seta"]}>
            <img src={setaVoltar} alt="Imagem Voltar" />
          </div>
          <h1>Foto de Perfil</h1>
          <h5>
            Insira aqui a imagem principal da oficina que aparecerá para os
            usuários do Buscar!
          </h5>
          <div className={styles["fotos"]}>
            <div className={styles["container-foto"]}>
              <img src={imagem} alt="" />
            </div>
          </div>
          <div className={styles["link-foto"]}>
            {/* <a></a>
                        <a></a>
                        <a></a>
                        <a></a> */}
          </div>
          <div
            onClick={() => document.getElementById("ipt_img").click()}
            className={styles["botao-add"]}
          >
            <input
              type="file"
              style={{ display: "none" }}
              id="ipt_img"
              onChange={handleFileChange}
            />
            <a>
              <img src={botaoAdd} alt="Imagem do botão adicionar" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Galeria;
