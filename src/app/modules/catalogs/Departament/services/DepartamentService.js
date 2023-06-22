import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const departamentUrl = API_URL + 'catalogs/departaments/';

//Get Departaments
export const getDepartaments= async () => {
    const response = await axios.get(departamentUrl);
    return response.data;
};


//Get Departament by id
export const getDepartamentById = (id) => {
    return axios.get(`${departamentUrl}${id}/`);
};

//Create Departament
export const createDepartament = (data) => {
    return axios.post(departamentUrl, data);
};

//update Departament
export const updateDepartament = (id, data) => {
    return axios.put(`${departamentUrl}${id}/`, data);
};

//delete Departament
export const deleteDepartament = (id) => {
    return axios.delete(`${departamentUrl}${id}/`);
};

