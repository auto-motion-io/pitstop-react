import axios from "axios";

const api = axios.create({
    baseURL: "http://52.204.58.45:80/api" //API DO PITSTOP
}); 

export default api;

const retornaCep = (cep) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

export { retornaCep };