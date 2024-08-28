import { configureStore } from "@reduxjs/toolkit";
import userPreferencesReducer from "@/app/userPreferencesSlice";

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
  },
});

// Infer the type of `store`
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
