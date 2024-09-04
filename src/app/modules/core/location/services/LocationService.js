import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';

const locationsUrl = API_URL + 'core/locations/';

//Get Locations
export const getLocations = async () => {
    const response = await axios.get(locationsUrl);
    return response.data;
};


//Get locations by id
export const getlocationsById = (id) => {
    return axios.get(`${locationsUrl}${id}/`);
};

//Create locations
export const createlocations = (data) => {
    return axios.post(locationsUrl, data);
};

//update locations
export const updatelocations = (id, data) => {
    return axios.put(`${locationsUrl}${id}/`, data);
};

//delete locations
export const deletelocations = (id) => {
    return axios.delete(`${locationsUrl}${id}/`);
};

