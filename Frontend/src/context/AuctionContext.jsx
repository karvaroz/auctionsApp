import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { createAdRequest, getAllAdsRequest } from "../api/auction"
import { Toast } from "../utils/Toast"
import { useGlobalState } from "./AuthContext"

export const AuctionGlobal = createContext()

export const AuctionProvider = ({ children }) => {
  const [ads, setAds] = useState([])
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useGlobalState()

  useEffect(() => {
    const newSocket = io("http://localhost:3000")
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [user])

  useEffect(() => {
    if (!socket) return
    socket.emit("userLoggedIn", user?.id)
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res)
    })

    return () => {
      socket.off("getOnlineUsers")
    }
  }, [socket])

  const createAd = async (data) => {
    try {
      const res = await createAdRequest(data)
      if (res.status == 201) {
        Toast("Created successfully", "success")
        console.log(res)
        socket.emit("auctionCreated", res.data.data)
      }
    } catch (error) {
      console.log(error)
      Toast("Ups something went wrong", "error")
    }
  }

  const getAds = async () => {
    const res = await getAllAdsRequest()
    setAds(res.data.data)
  }

  return (
    <AuctionGlobal.Provider
      value={{
        ads,
        createAd,
        getAds,
        onlineUsers,
      }}
    >
      {children}
    </AuctionGlobal.Provider>
  )
}

export const AuctionGlobalState = () => useContext(AuctionGlobal)
