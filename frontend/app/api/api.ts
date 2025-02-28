import axios from 'axios';

const bearerToken = localStorage.getItem('token')
const api = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Content-Type': 'application/json',  
  },
});

export default api;