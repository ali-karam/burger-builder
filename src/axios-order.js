import axios from 'axios';
import myURL from './baseUrl';

const instance = axios.create({
    baseURL: myURL
});

export default instance;