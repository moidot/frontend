import axios from 'axios';
import TokenService from '@/services/TokenService';

export const customedAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

if (typeof window !== 'undefined') {
  customedAxios.interceptors.request.use((config) => {
    if (TokenService.getToken() !== undefined && TokenService.getId() !== undefined) {
      config.headers!.authorization = `Bearer ${TokenService.getToken()}`;
    }
    return config;
  });
}
export default customedAxios;
