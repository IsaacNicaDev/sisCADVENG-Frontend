import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const professorUrl = API_URL + 'core/professors/';

//Get Professors
export const getProfessors = async () => {
    const response = await axios.get(professorUrl);
    return response.data;
};


//Get Professors by id
export const getProfessorById = (id) => {
    return axios.get(`${professorUrl}${id}/`);
};

//Create Professors
export const createProfessor = (data) => {
    return axios.post(professorUrl, data);
};

//update Professors
export const updateProfessor = (id, data) => {
    return axios.put(`${professorUrl}${id}/`, data);
};

//delete Professors
export const deleteProfessor = (id) => {
    return axios.delete(`${professorUrl}${id}/`);
};

