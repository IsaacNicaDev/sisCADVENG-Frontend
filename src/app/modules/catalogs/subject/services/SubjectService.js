import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const subjectUrl = API_URL + 'catalogs/subjects/';

//Get Subjects
export const getSubjects = async () => {
    const response = await axios.get(subjectUrl);
    return response.data;
};


//Get Subject by id
export const getSubjectById = (id) => {
    return axios.get(`${subjectUrl}${id}/`);
};

//Create Subject
export const createSubject = (data) => {
    return axios.post(subjectUrl, data);
};

//update Subject
export const updateSubject = (id, data) => {
    return axios.put(`${subjectUrl}${id}/`, data);
};

//delete Subject
export const deleteSubject = (id) => {
    return axios.delete(`${subjectUrl}${id}/`);
};

