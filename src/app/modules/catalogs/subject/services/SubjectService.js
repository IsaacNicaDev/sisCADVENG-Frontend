import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const subjectUrl = API_URL + 'catalogs/subjects/';

//Get Subjects
export const getSubject = async () => {
    const response = await axios.get(subjectUrl);
    return response.data;
};


//Get Subject by id
export const getsubjectById = (id) => {
    return axios.get(`${subjectUrl}${id}/`);
};

//Create Subject
export const createsubject = (data) => {
    return axios.post(subjectUrl, data);
};

//update Subject
export const updatesubject = (id, data) => {
    return axios.put(`${subjectUrl}${id}/`, data);
};

//delete Subject
export const deletesubject = (id) => {
    return axios.delete(`${subjectUrl}${id}/`);
};

