import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const educationalLevelUrl = API_URL + 'catalogs/educational-levels/';

//Get EducationalLevels
export const getEducationalLevels = async () => {
    const response = await axios.get(educationalLevelUrl);
    return response.data;
};


//Get educationalLevel by id
export const getEducationalLevelById = (id) => {
    return axios.get(`${educationalLevelUrl}${id}/`);
};

//Create educationalLevel
export const createEducationalLevel = (data) => {
    return axios.post(educationalLevelUrl, data);
};

//update educationalLevel
export const updateEducationalLevel = (id, data) => {
    return axios.put(`${educationalLevelUrl}${id}/`, data);
};

//delete educationalLevel
export const deleteEducationalLevel = (id) => {
    return axios.delete(`${educationalLevelUrl}${id}/`);
};

