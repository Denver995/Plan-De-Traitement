import axios from 'axios'; 
import {BASE_URL_API} from "../utils/urls";
const user = JSON.parse(localStorage.getItem('user'));
const token = user&&user.accessToken? user.accessToken: '';

console.log("MY TOKEN AXIOS ");
console.log(token);
export default axios.create({
    withCredentials: false,
    baseURL: BASE_URL_API,
    headers: {
        "Content-type": "application/json",
    }
});

