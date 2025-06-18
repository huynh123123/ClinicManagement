import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse ,AxiosError} from 'axios';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa base type cho API response
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

// Cấu hình base URL
const BASE_URL = Platform.OS === 'android' 
  ? 'http://10.0.2.2:5000/api' 
  : 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Thêm interceptor để tự động gắn token
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);


// Xử lý response
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      return Promise.reject({
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText
      });
    }
    return Promise.reject(error);
  }
);

export default api;