import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const socialApi = createApi({
    reducerPath: "socialApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/social`, credentials: "include" }),
    tagTypes: ["social"],
    endpoints: (builder) => {
        return {
            getSocial: builder.query({
                query: () => {
                    return {
                        url: "/get-social",
                        method: "GET"
                    }
                },
                providesTags: ["social"],
                transformResponse: data => data.result
            }),
            addSocial: builder.mutation({
                query: socialData => {
                    return {
                        url: "/add-social",
                        method: "POST",
                        body: socialData
                    }
                },
                invalidatesTags: ["social"]
            }),
            updateSocial: builder.mutation({
                query: socialData => {
                    return {
                        url: `/update-social/${socialData._id}`,
                        method: "PUT",
                        body: socialData
                    }
                },
                invalidatesTags: ["social"]
            }),
            deleteSocial: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-social/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["social"]
            }),

        }
    }
})

export const { useGetSocialQuery, useAddSocialMutation, useUpdateSocialMutation, useDeleteSocialMutation } = socialApi
