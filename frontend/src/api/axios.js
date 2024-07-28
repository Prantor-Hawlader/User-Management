import axios from 'axios';

const dataFetch = axios.create({
    baseURL: 'https://user-management-server-brown.vercel.app',
    // baseURL: 'http://localhost:5000',
});

export default dataFetch;
