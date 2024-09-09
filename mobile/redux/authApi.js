import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://portfolio-new-xjp0.onrender.com/api/auth" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            loginMobileUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["auth"]
            }),
            logoutMobileUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["auth"]
            }),

        }
    }
})

export const { useLoginMobileUserMutation, useLogoutMobileUserMutation } = authApi
