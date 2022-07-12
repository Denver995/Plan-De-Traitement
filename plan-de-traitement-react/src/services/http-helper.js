import axios from 'axios';
import { BASE_URL_API } from "../utils/urls";
const user = JSON.parse(localStorage.getItem('user'));

export default axios.create({
    withCredentials: false,
    baseURL: BASE_URL_API,
    headers: {
        "Content-type": "application/json",
    }
});

