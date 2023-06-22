import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const departamentalDelegationUrl = API_URL + 'catalogs/departamental-delegations/';

//Get DepartamentalDelegations
export const getDepartamentalDelegations= async () => {
    const response = await axios.get(departamentalDelegationUrl);
    return response.data;
};


//Get DepartamentalDelegation by id
export const getDepartamentalDelegationById = (id) => {
    return axios.get(`${departamentalDelegationUrl}${id}/`);
};

//Create DepartamentalDelegation
export const createDepartamentalDelegation = (data) => {
    return axios.post(departamentalDelegationUrl, data);
};

//update DepartamentalDelegation
export const updateDepartamentalDelegation = (id, data) => {
    return axios.put(`${departamentalDelegationUrl}${id}/`, data);
};

//delete DepartamentalDelegation
export const deleteDepartamentalDelegation = (id) => {
    return axios.delete(`${departamentalDelegationUrl}${id}/`);
};

