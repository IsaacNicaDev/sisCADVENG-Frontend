import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const shiftUrl = API_URL + 'catalogs/shifts/';

//Get Shifts
export const getShifts = async () => {
    const response = await axios.get(shiftUrl);
    return response.data;
};


//Get Shift by id
export const getShiftById = (id) => {
    return axios.get(`${shiftUrl}${id}/`);
};

//Create Shift
export const createShift = (data) => {
    return axios.post(shiftUrl, data);
};

//update Shift
export const updateShift = (id, data) => {
    return axios.put(`${shiftUrl}${id}/`, data);
};

//delete Shift
export const deleteShift = (id) => {
    return axios.delete(`${shiftUrl}${id}/`);
};

