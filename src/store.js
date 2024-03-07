import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./services/blogsApi"; 
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({

    reducer: {
        [blogApi.reducerPath]:blogApi.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,
    }).concat(blogApi.middleware)
});

setupListeners(store.dispatch);