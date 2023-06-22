import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const educational_InstitutionUrl = API_URL + 'catalogs/educational-institutions/';

//Get Educational_Institutions
export const getEducational_Institutions = async () => {
    const response = await axios.get(educational_InstitutionUrl);
    return response.data;
};


//Get Educational_Institution by id
export const getEducational_InstitutionById = (id) => {
    return axios.get(`${educational_InstitutionUrl}${id}/`);
};

//Create Educational_Institution
export const createEducational_Institution = (data) => {
    return axios.post(educational_InstitutionUrl, data);
};

//update Educational_Institution
export const updateEducational_Institution = (id, data) => {
    return axios.put(`${educational_InstitutionUrl}${id}/`, data);
};

//delete Educational_Institution
export const deleteEducational_Institution = (id) => {
    return axios.delete(`${educational_InstitutionUrl}${id}/`);
};

