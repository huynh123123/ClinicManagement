import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000/api', // dùng '10.0.2.2' nếu bạn test trong Android Emulator
});

export default api;
