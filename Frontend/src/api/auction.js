import axios from "axios"
import { API_URL } from "./axios"

const token = JSON.parse(localStorage.getItem("token"))

const reqInstance = axios.create({
  baseURL: API_URL,
  // timeout: 5000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const getAllAdsRequest = async () => {
  return await reqInstance.get(`/ad`)
}

export const createAdRequest = async (ad) => {
  return await reqInstance.post(`/ad`, ad)
}

export const getAdByIdRequest = async (adId) => {
  return await reqInstance.get(`/ad/${adId}`)
}

export const joinRoomRequest = async (roomId) => {
  return await reqInstance.post(`/room/join/${roomId}`)
}

export const getRoomById = async (roomId) => {
  return await reqInstance.get(`/room/${roomId}`)
}

export const startAuctionRequest = async (adId) => {
  return await reqInstance.post(`/auction/start/${adId}`)
}

export const offerBidRequest = async (adId, amount) => {
  return await reqInstance.post(`/bid/${adId}?amount=${amount}`)
}

export const getAllBidsRequest = async (adId) => {
  return await reqInstance.get(`/bid/${adId}`)
}
