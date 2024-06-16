import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import BoxInfo from "../../components/boxInfo/BoxInfo";
import BoxConfig from "../../components/boxConfig/BoxConfig";
import Alignner from "../../components/alignner/Alignner";
import Input from "../../components/input/Input";
import { inputMascaraTelefoneCelular } from "../../utils/global";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ClienteEditar = () => {
    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [email, setEmail] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
    const inputs =
        <div>
            <Input nome={"Nome*"} tipo={"text"} value={nome} onChange={(e) => setNome(e.target.value)} tamanho={"100%"} />
            <Input nome={"Telefone*"} tipo={"text"} value={telefone} onChange={(e) => setTelefone(e.target.value)} onInput={inputMascaraTelefoneCelular} maxLength={15} tamanho={"80%"} />
            <Input nome={"E-mail*"} tipo={"text"} value={email} onChange={(e) => setEmail(e.target.value)} tamanho={"100%"} />
        </div>

    async function handleEditar() {
        try{
            await api.put(`/clientes/${id}`, {
                nome: nome,
                telefone: telefone,
                email: email,
            });
            toast.success('Dados editados com sucesso!');
            navigate("/clientes");
        } catch (error) {
            toast.error('Erro ao editar dados!');
        }
    }

    function handleValorEditar() {
        api.get(`/clientes/${id}`)
        .then((response) => {
            setNome(response.data.nome);
            setTelefone(response.data.telefone);
            setEmail(response.data.email);
        })
        .catch((error) => {
            console.log("Erro foi esse aqui: ", error);
        });
    }

    useEffect(() => {
        handleValorEditar();
    }, []);

    return (
        <>
            <div>
                <NavBar currentPage={"clientes"}/>
            </div>
            <Alignner>
                <BoxInfo titulo="Clientes" resposta={["Nome", "Telefone", "E-mail", "Ações"]} endpoint={"/clientes"}/>
                <BoxConfig titulo={"Editar"} nomeBotao={"Salvar"} onClick={handleEditar} inputs={inputs}/>
            </Alignner>
        </>
    );
};

export default ClienteEditar;
