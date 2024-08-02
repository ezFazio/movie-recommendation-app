import axios from 'axios';


const API_KEY = '398317c6288b7febe2bada057642fc85';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
});

export default api;