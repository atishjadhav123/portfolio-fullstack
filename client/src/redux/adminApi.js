import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, credentials: "include" }),
    tagTypes: ["Tech"],
    endpoints: (builder) => {
        return {
            getTechnologies: builder.query({
                query: () => {
                    return {
                        url: "/get-tech",
                        method: "GET"
                    }
                },
                providesTags: ["Tech"],
                transformResponse: data => data.result
            }),
            addTech: builder.mutation({
                query: techData => {
                    return {
                        url: "/add-tech",
                        method: "POST",
                        body: techData
                    }
                },
                invalidatesTags: ["Tech"]
            }),
            updateTech: builder.mutation({
                query: techData => {
                    return {
                        url: `/update-tech/${techData._id}`,
                        method: "PUT",
                        body: techData
                    }
                },
                invalidatesTags: ["Tech"]
            }),
            deleteTech: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-tech/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["Tech"]
            }),

        }
    }
})

export const { useGetTechnologiesQuery, useAddTechMutation, useUpdateTechMutation, useDeleteTechMutation } = adminApi
