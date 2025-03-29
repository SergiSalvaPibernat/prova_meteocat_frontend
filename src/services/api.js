import axios from 'axios'; // Importa la llibreria Axios per fer peticions HTTP

// Definició de la URL base de l'API
const API_URL = 'http://localhost:8080/api';

/**
 * Obté la llista de municipis disponibles.
 * @returns {Promise} Retorna una promesa amb la resposta de l'API.
 */
export const getMunicipis = () => {
    return axios.get(`${API_URL}/municipis`);
};

/**
 * Obté la predicció meteorològica per a un municipi donat.
 * @param {string} codiMunicipi - Codi del municipi per al qual es vol obtenir la predicció.
 * @returns {Promise} Retorna una promesa amb la resposta de l'API.
 */
export const getPrediccio = (codiMunicipi) => {
    return axios.get(`${API_URL}/prediccio/${codiMunicipi}`);
};
