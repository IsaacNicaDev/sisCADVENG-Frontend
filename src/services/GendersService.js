import axios from "axios";
const API_URL = 'http://localhost:8000';

export default class GendersService{

    constructor(){}

    //CRUD

    getGenders() {
        const url = `${API_URL}/api/catalogs/genders/`;
        return axios.get(url).then(response => response.data);
    }

    getGendersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getGender(pk){
        const url = `${API_URL}/api/catalogs/genders/${pk}`;
        return axios.get(url).then(response => response.data)
    }

    deleteGender(gender){
        const url = `${API_URL}/api/catalogs/genders/${gender.pk}`;
        return axios.delete(url);
    }

    createGender(gender){
        const url = `${API_URL}/api/catalogs/genders/`;
        return axios.post(url, gender);
    }

    updateGender(gender){
        const url = `${API_URL}/api/catalogs/genders/${gender.pk}`;
        return axios.put(url, gender);
    }
    
}