import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const languageUrl = API_URL + 'catalogs/languages/';

//Get Languages
export const getLanguages = async () => {
    const response = await axios.get(languageUrl);
    return response.data;
};


//Get Language by id
export const getLanguageById = (id) => {
    return axios.get(`${languageUrl}${id}/`);
};

//Create Language
export const createLanguage = (data) => {
    return axios.post(languageUrl, data);
};

//update Language
export const updateLanguage = (id, data) => {
    return axios.put(`${languageUrl}${id}/`, data);
};

//delete Language
export const deleteLanguage = (id) => {
    return axios.delete(`${languageUrl}${id}/`);
};

