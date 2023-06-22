import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const disabilityUrl = API_URL + 'catalogs/disabilities/';

//Get Ethnicities
export const getDisabilities= async () => {
    const response = await axios.get(disabilityUrl);
    return response.data;
};


//Get Disability by id
export const getDisabilityById = (id) => {
    return axios.get(`${disabilityUrl}${id}/`);
};

//Create Disability
export const createDisability = (data) => {
    return axios.post(disabilityUrl, data);
};

//update Disability
export const updateDisability = (id, data) => {
    return axios.put(`${disabilityUrl}${id}/`, data);
};

//delete Disability
export const deleteDisability = (id) => {
    return axios.delete(`${disabilityUrl}${id}/`);
};

