import axios from 'axios';
import { API_URL } from '../../../../../infrastructure';
const enrolment_typesUrl = API_URL + 'catalogs/enrolment-types/';

//Get enrolment_typess
export const getEnrolment_types = async () => {
    const response = await axios.get(enrolment_typesUrl);
    return response.data;
};

//Get enrolment_types by id
export const getEnrolment_typesById = (id) => {
    return axios.get(`${enrolment_typesUrl}${id}/`);
};

//Create enrolment_types
export const createEnrolment_types = (data) => {
    return axios.post(enrolment_typesUrl, data);
};

//update enrolment_types
export const updateEnrolment_types = (id, data) => {
    return axios.put(`${enrolment_typesUrl}${id}/`, data);
};

//delete enrolment_types
export const deleteEnrolment_types = (id) => {
    return axios.delete(`${enrolment_typesUrl}${id}/`);
};

