import { createSlice } from "@reduxjs/toolkit";

const mobileauthSlice = createSlice({
    name: "mobileauthSlice",
    initialState: {},
    reducers: {
        setLocalData: (state, { payload }) => {
            state.user = payload
        }
    },
    extraReducers: builder => builder
        .addMatcher(mobileauthApi.endpoints.loginmobileUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(mobileauthApi.endpoints.logoutMobileUser.matchFulfilled, (state, { payload }) => {
            state.user = null
        })


})

export const { setLocalData } = mobileauthSlice.actions
export default mobileauthSlice.reducer