// axiosConfig.js
import axios from 'axios';

export const configureAxios = () => {
    // Set the default baseURL
    axios.defaults.baseURL = 'http://localhost:8000';

    // In axiosConfig.js, inside the configureAxios function:

    const token = localStorage.getItem('access_token');
    console.log("Setting axios token header:", token); // Add this line here
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

};

const instance = axios;

export default instance;


