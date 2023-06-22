import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const zonesUrl = API_URL + 'catalogs/zones/';

//Get Zones
export const getZones = async () => {
    const response = await axios.get(zonesUrl);
    return response.data;
};

//Get Zones by id
export const getZoneById = (id) => {
    return axios.get(`${zonesUrl}${id}/`);
};

//Create Zones
export const createZone = (data) => {
    return axios.post(zonesUrl, data);
};

//update Zones
export const updateZone = (id, data) => {
    return axios.put(`${zonesUrl}${id}/`, data);
};

//delete Zones
export const deleteZone = (id) => {
    return axios.delete(`${zonesUrl}${id}/`);
};

