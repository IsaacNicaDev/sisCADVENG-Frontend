import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const gradeUrl = API_URL + 'catalogs/grades/';

//Get grades
export const getGrades = async () => {
    const response = await axios.get(gradeUrl);
    return response.data;
};


//Get Grades by id
export const getGradeById = (id) => {
    return axios.get(`${gradeUrl}${id}/`);
};

//Create Grades
export const createGrade = (data) => {
    return axios.post(gradeUrl, data);
};

//update Grades
export const updateGrade = (id, data) => {
    return axios.put(`${gradeUrl}${id}/`, data);
};

//delete Grades
export const deleteGrade = (id) => {
    return axios.delete(`${gradeUrl}${id}/`);
};

