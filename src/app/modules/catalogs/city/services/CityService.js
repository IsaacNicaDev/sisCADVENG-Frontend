import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const cityUrl = API_URL + 'catalogs/cities/';

//Get Cities
export const getCities = async () => {
    const response = await axios.get(cityUrl);
    return response.data;
};


//Get City by id
export const getCityById = (id) => {
    return axios.get(`${cityUrl}${id}/`);
};

//Create City
export const createCity = (data) => {
    return axios.post(cityUrl, data);
};

//update City
export const updateCity = (id, data) => {
    return axios.put(`${cityUrl}${id}/`, data);
};

//delete City
export const deleteCity = (id) => {
    return axios.delete(`${cityUrl}${id}/`);
};

