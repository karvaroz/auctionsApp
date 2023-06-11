import axios from "axios"
import { API_URL } from "./axios"

const token = JSON.parse(localStorage.getItem("token"))

export const getAllAdsRequest = async () => {
  return await axios.get(`${API_URL}/ad`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const createAdRequest = async (ad) => {
  return await axios.post(`${API_URL}/ad`, ad, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const getAdByIdRequest = async (adId) => {
  return await axios.get(`http://localhost:3000/api/v1/ad/${adId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
