import axios from 'axios';

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: 'https://nirmiti-ai-software-developer-with-real.onrender.com/api/v1',
  // baseURL: 'http://localhost:4000/api/v1', 
  
});

export default instance;
