import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {baseApi} from "@/redux/api/baseApi";


const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baseApi.middleware),
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];