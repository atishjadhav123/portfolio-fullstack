import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/auth`, credentials: "include" }),
    tagTypes: ["tagName"],
    endpoints: (builder) => {
        return {
            loginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["tagName"],
                transformResponse: data => {
                    localStorage.setItem("auth", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["tagName"],
                transFormResponse: data => {
                    localStorage.removeItem("auth")
                    return data.result

                }

            }),

        }
    }
})

export const { useLoginUserMutation, useLogoutUserMutation } = authApi
