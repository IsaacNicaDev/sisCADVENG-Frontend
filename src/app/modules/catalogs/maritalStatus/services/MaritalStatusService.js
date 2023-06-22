import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const maritalStatusUrl = API_URL + 'catalogs/maritalstatus/';

//Get MaritalStatus
export const getMaritalStatus = async () => {
    const response = await axios.get(maritalStatusUrl);
    return response.data;
};

//Get MaritalStatuss by id
export const getMaritalStatusById = (id) => {
    return axios.get(`${maritalStatusUrl}${id}/`);
};

//Create MaritalStatuss
export const createMaritalStatus = (data) => {
    return axios.post(maritalStatusUrl, data);
};

//update MaritalStatuss
export const updateMaritalStatus = (id, data) => {
    return axios.put(`${maritalStatusUrl}${id}/`, data);
};

//delete MaritalStatuss
export const deleteMaritalStatus = (id) => {
    return axios.delete(`${maritalStatusUrl}${id}/`);
};

