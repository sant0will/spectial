
import axios from "axios";

const api = axios.create({
   baseURL: 'localhost:3030' 
});

export default api;