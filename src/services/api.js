import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getMunicipis = () => {
    return axios.get(`${API_URL}/municipis`);
};

export const getPrediccio = (codiMunicipi) => {
    return axios.get(`${API_URL}/prediccio/${codiMunicipi}`);
};