import axios from "axios"

export const API_URL =
  // import.meta.env.VITE_REACT_APP_API_URL ||
  "http://localhost:3000/api/v1"

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

export default instance
