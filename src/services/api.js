import axios from "axios";

const api = axios.create({
    baseURL: "http://98.82.48.216:80/api" //API DO PITSTOP
}); 

export default api;

const retornaCep = (cep) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

export { retornaCep };