import { useEffect, useState } from "react"
import { createContext, useContext } from "react"
import jwt_decode from "jwt-decode"
import io from "socket.io-client"

import { registerUserRequest, loginUserRequest } from "../api/auth"
import { Toast } from "../utils/Toast"
export const ContextGlobal = createContext()

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const token = JSON.parse(localStorage.getItem("token")) || null
  const socket = io("http://localhost:3000")

  const signUpUser = async (newUser) => {
    try {
      const res = await registerUserRequest(newUser)

      if (res.status == 201) {
        Toast("Registered successfully", "success")
        console.log(res)
      }
    } catch (error) {
      console.log(error)
      Toast("Ups something went wrong", "error")
    }
  }

  const logInUser = async (loggedUser) => {
    try {
      const res = await loginUserRequest(loggedUser)
      if (res.status == 200) {
        setIsAuthenticated(true)
        localStorage.setItem("token", JSON.stringify(res.data.token))
        Toast("Login successfully", "success")
        console.log(res)
        socket.emit("userLoggedIn", res.data.token)
      }
    } catch (error) {
      console.log(error)
      Toast("Ups something went wrong", "error")
    }
  }

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      setUser(decoded)
      setIsAuthenticated(true)
    }
  }, [token])

  return (
    <ContextGlobal.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        logInUser,
        signUpUser,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  )
}

export const useGlobalState = () => useContext(ContextGlobal)
