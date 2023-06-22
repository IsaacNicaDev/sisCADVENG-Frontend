import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const districtUrl = API_URL + 'catalogs/districts/';

//Get Districts
export const getDistricts = async () => {
    const response = await axios.get(districtUrl);
    return response.data;
};

//Get Districts by id
export const getDistrictById = (id) => {
    return axios.get(`${districtUrl}${id}/`);
};

//Create Districts
export const createDistrict = (data) => {
    return axios.post(districtUrl, data);
};

//update Districts
export const updateDistrict = (id, data) => {
    return axios.put(`${districtUrl}${id}/`, data);
};

//delete Districts
export const deleteDistrict = (id) => {
    return axios.delete(`${districtUrl}${id}/`);
};

