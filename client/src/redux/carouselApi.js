import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const carouselApi = createApi({
    reducerPath: "carouselApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/carousel`, credentials: "include" }),
    tagTypes: ["blog"],
    endpoints: (builder) => {
        return {
            getAllCarousel: builder.query({
                query: () => {
                    return {
                        url: "/get-carousel",
                        method: "GET"
                    }
                },
                providesTags: ["blog"],
                transformResponse: data => data.result
            }),
            addCarousel: builder.mutation({
                query: carouselData => {
                    return {
                        url: "/add-carousel",
                        method: "POST",
                        body: carouselData
                    }
                },
                invalidatesTags: ["blog"]
            }),
            updateCarousel: builder.mutation({
                query: carouselData => {
                    return {
                        url: `/update-carousel/${carouselData._id}`,
                        method: "PUT",
                        body: carouselData.fd
                    }
                },
                invalidatesTags: ["blog"]
            }),
            deleteCarousel: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-carousel/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["blog"]
            }),

        }
    }
})

export const { useGetAllCarouselQuery, useUpdateCarouselMutation, useAddCarouselMutation, useDeleteCarouselMutation } = carouselApi
