import instance from "./axios";

export const registerUserRequest = async (user) => {
    return await instance.post("/register", user)
}

export const loginUserRequest = async (user) => {
    return await instance.post("/login", user)
}

