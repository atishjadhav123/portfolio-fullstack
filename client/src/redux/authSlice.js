import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authslice = createSlice({
    name: "authslice",
    initialState: { user: JSON.parse(localStorage.getItem("auth")) },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
            state.user = null
        })

})

export default authslice.reducer