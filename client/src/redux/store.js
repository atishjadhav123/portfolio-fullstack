import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./authSlice";
import { adminApi } from "./adminApi";
import { socialApi } from "./socialApi";
import { carouselApi } from "./carouselApi";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [socialApi.reducerPath]: socialApi.reducer,
        [carouselApi.reducerPath]: carouselApi.reducer,
        auth: authSlice,
    },
    middleware: def => [...def(), authApi.middleware, adminApi.middleware, socialApi.middleware, carouselApi.middleware]
})

export default reduxStore