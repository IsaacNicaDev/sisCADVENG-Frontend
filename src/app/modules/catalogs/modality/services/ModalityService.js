import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const modalityUrl = API_URL + 'catalogs/modalities/';

//Get Modalities
export const getModalities = async () => {
    const response = await axios.get(modalityUrl);
    return response.data;
};


//Get Modality by id
export const getModalityById = (id) => {
    return axios.get(`${modalityUrl}${id}/`);
};

//Create Modality
export const createModality = (data) => {
    return axios.post(modalityUrl, data);
};

//update Modality
export const updateModality = (id, data) => {
    return axios.put(`${modalityUrl}${id}/`, data);
};

//delete Modality
export const deleteModality = (id) => {
    return axios.delete(`${modalityUrl}${id}/`);
};

