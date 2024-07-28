import axios from 'axios';

const dataFetch = axios.create({
    baseURL: 'https://user-management-server-brown.vercel.app',

});

export default dataFetch;
