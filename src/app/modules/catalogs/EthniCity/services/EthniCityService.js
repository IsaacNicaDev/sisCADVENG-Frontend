import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const ethnicityUrl = API_URL + 'catalogs/ethnicities/';

//Get Ethnicities
export const getEthnicities = async () => {
    const response = await axios.get(ethnicityUrl);
    return response.data;
};


//Get Ethnicity by id
export const getEthnicityById = (id) => {
    return axios.get(`${ethnicityUrl}${id}/`);
};

//Create Ethnicity
export const createEthnicity = (data) => {
    return axios.post(ethnicityUrl, data);
};

//update Ethnicity
export const updateEthnicity = (id, data) => {
    return axios.put(`${ethnicityUrl}${id}/`, data);
};

//delete Ethnicity
export const deleteEthnicity = (id) => {
    return axios.delete(`${ethnicityUrl}${id}/`);
};

