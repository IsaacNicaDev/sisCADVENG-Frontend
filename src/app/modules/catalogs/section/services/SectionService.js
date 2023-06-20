import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const sectionUrl = API_URL + 'catalogs/sections/';

//Get Sections
export const getSections = async () => {
    const response = await axios.get(sectionUrl);
    return response.data;
};


//Get Section by id
export const getSectionById = (id) => {
    return axios.get(`${sectionUrl}${id}/`);
};

//Create Section
export const createSection = (data) => {
    return axios.post(sectionUrl, data);
};

//update Section
export const updateSection = (id, data) => {
    return axios.put(`${sectionUrl}${id}/`, data);
};

//delete Section
export const deleteSection = (id) => {
    return axios.delete(`${sectionUrl}${id}/`);
};

