import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';
const genderUrl = API_URL + 'catalogs/genders/';


/*//Get genders
export const getGenders = () => {
    return axios.get(genderUrl);
};*/
//Get genders
export const getGenders = async () => {
    const response = await axios.get(genderUrl);
    return response.data;
};


//Get gender by id
export const getGenderById = (id) => {
    return axios.get(`${genderUrl}${id}/`);
};

//Create gender
export const createGender = (data) => {
    return axios.post(genderUrl, data);
};

//update gender
export const updateGender = (id, data) => {
    return axios.put(`${genderUrl}${id}/`, data);
};

//delete gender
export const deleteGender = (id) => {
    return axios.delete(`${genderUrl}${id}/`);
};


//CRUD

/* getGenders() {
     const url = `${API_URL}/api/catalogs/genders/`;
     return axios.get(url).then(response => response.data);
 }

getGendersByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
}

getGender(pk) {
    const url = `${API_URL}/api/catalogs/genders/${pk}`;
    return axios.get(url).then(response => response.data)
}

deleteGender(gender) {
    const url = `${API_URL}/api/catalogs/genders/${gender.pk}`;
    return axios.delete(url);
}

createGender(gender) {
    const url = `${API_URL}/api/catalogs/genders/`;
    return axios.post(url, gender);
}

updateGender(gender) {
    const url = `${API_URL}/api/catalogs/genders/${gender.pk}`;
    return axios.put(url, gender);
}
*/


