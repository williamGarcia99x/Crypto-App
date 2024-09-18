import { configureStore } from "@reduxjs/toolkit";
import userPreferencesReducer from "@/app/userPreferencesSlice";
import homeReducer from "./(home)/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
