import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

type userPreferencesState = {
  darkModeEnabled: boolean;
  currency: "USD" | "GBP" | "EUR" | "BTC" | "ETH";
};

const initialState: userPreferencesState = {
  darkModeEnabled: false,
  currency: "USD",
};

const userPreferencesSlice = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    toggleState(state) {
      state.darkModeEnabled = !state.darkModeEnabled;
    },
  },
});

export const { toggleState } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;

//The Redux team recommends that in the slice files, we define what data items react components can select. All the data preparation and manipulation must be performed in the Redux selector functions below and must return the data items needed by the components
export const isDarkModeEnabled = (state: RootState) =>
  state.userPreferences.darkModeEnabled;
