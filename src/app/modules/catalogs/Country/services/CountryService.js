import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const countryUrl = API_URL + 'catalogs/countries/';

//Get countries
export const getcountries = async () => {
    const response = await axios.get(countryUrl);
    return response.data;
};


//Get Country by id
export const getCountryById = (id) => {
    return axios.get(`${countryUrl}${id}/`);
};

//Create Country
export const createCountry = (data) => {
    return axios.post(countryUrl, data);
};

//update Country
export const updateCountry = (id, data) => {
    return axios.put(`${countryUrl}${id}/`, data);
};

//delete Country
export const deleteCountry = (id) => {
    return axios.delete(`${countryUrl}${id}/`);
};

