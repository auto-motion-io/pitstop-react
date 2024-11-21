import axios from "axios";

const api = axios.create({
    baseURL: "https://pitstop.motionweb.me:443/api" //API DO PITSTOP
}); 

export default api;

const retornaCep = (cep) => {
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}

export { retornaCep };