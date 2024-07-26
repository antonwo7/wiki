import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query";
import {wikiAPI} from "../api/wp";
import commonReducer from "./reducers/commonSlice";
import searchReducer from "./reducers/searchSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        search: searchReducer,
        [wikiAPI.reducerPath]: wikiAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        wikiAPI.middleware,
    )
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)