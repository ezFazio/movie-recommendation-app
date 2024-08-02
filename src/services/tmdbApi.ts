import axios from 'axios';


const API_KEY = '398317c6288b7febe2bada057642fc85';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY
  }
});

export const searchMovies = async (query: string, language: string = 'en-US') => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      language
    }
  });
  return response.data;
};

export const getMovieDetails = async (id: number, language: string = 'en-US') => {
  const response = await api.get(`/movie/${id}`, {
    params: {
      language
    }
  });
  return response.data;
};

export default api;