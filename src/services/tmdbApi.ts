import axios from 'axios';


const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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