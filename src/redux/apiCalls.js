import { publicRequest } from "../requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())

    try{
        const res= await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(err) {
        dispatch(loginFailure())
    }
}

export const register = async (user) => {
    try{
        const res= await publicRequest.post("/auth/register", user)
        return res.data
    }catch(err) {
        
    }
}

export const getGames = async (username) => {
    try{
        const res= await publicRequest.get(`/game/${username}`)
        return res.data
    }catch(err) {
        
    }
}

export const getGame = async ({data}) => {
    try{
        const res= await publicRequest.post("/findgame", data)
        return res.data
    }catch(err) {
        
    }
}

export const startGame = async (data) => {
    try {
        const res= await publicRequest.post("/game", data)
        return res
    } catch(err) {

    }
}

export const getAllGames = async (data) => {
    try {
        const res = await publicRequest.get("/game")
        return res.data
    } catch(err) {

    }
}

export const updateGame = async (data) => {
    try {
        const res= await publicRequest.put(`/game/${data.id}`, data.values)
        // console.log(data.values)
    } catch(err) {
        
    }
}