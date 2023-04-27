const API_URL = 'https://rickandmortyapi.com/api/';
const userUrl = API_URL + 'character/';

export const getUser = () => {
    return fetch(userUrl + '2').then(res => res.json());
};