import axios from "axios";
import { API_URL } from "../config";

const instance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    // withCredentials: true,
});

export default instance;