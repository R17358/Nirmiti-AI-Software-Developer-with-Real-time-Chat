import axios from 'axios';

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: 'https://soen-ai-software-developer.onrender.com/api/v1',
  baseURL: 'http://localhost:4000/api/v1', 
  
});

export default instance;
