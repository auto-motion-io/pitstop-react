import axios from "axios";

const api = axios.create({
    baseURL: "http://34.226.28.195:80/api" //API DO PITSTOP
}); 

export default api;

const retornaCep = (cep) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

export { retornaCep };