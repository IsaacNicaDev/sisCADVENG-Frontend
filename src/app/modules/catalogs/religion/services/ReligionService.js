import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const religionUrl = API_URL + 'catalogs/religions/';

//Get Religions
export const getReligions= async () => {
    const response = await axios.get(religionUrl);
    return response.data;
};


//Get Religion by id
export const getReligionById = (id) => {
    return axios.get(`${religionUrl}${id}/`);
};

//Create Religion
export const createReligion = (data) => {
    return axios.post(religionUrl, data);
};

//update Religion
export const updateReligion = (id, data) => {
    return axios.put(`${religionUrl}${id}/`, data);
};

//delete Religion
export const deleteReligion = (id) => {
    return axios.delete(`${religionUrl}${id}/`);
};

