import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const municipalityUrl = API_URL + 'catalogs/municipalities/';

//Get Municipalities
export const getMunicipalities = async () => {
    const response = await axios.get(municipalityUrl);
    return response.data;
};


//Get Municipality by id
export const getMunicipalityById = (id) => {
    return axios.get(`${municipalityUrl}${id}/`);
};

//Create Municipality
export const createMunicipality = (data) => {
    return axios.post(municipalityUrl, data);
};

//update Municipality
export const updateMunicipality = (id, data) => {
    return axios.put(`${municipalityUrl}${id}/`, data);
};

//delete Municipality
export const deleteMunicipality = (id) => {
    return axios.delete(`${municipalityUrl}${id}/`);
};

