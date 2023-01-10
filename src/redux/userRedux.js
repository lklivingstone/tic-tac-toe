import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching= true
        },
        loginSuccess: (state, action)=> {
            state.isFetching= false
            state.user= action.payload
        },
        loginFailure: (state) => {
            state.isFetching= false
            state.error= true
        },
        logOut: (state)=> {
            state.user= null
            state.error= false
        }
    }
})

export const { loginStart, loginFailure, loginSuccess, logOut } = userSlice.actions
export const selectUser = (state) => state.user.user
export default userSlice.reducer