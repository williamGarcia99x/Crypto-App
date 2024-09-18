import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type HomeStateType = {
  selectedCoin: string;
  daysAgo: 1 | 7 | 14 | 30 | 365;
};

const initialState: HomeStateType = {
  selectedCoin: "bitcoin",
  daysAgo: 1,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setCoin(state, action: PayloadAction<string>) {
      state.selectedCoin = action.payload;
    },
    setDaysAgo(state, action: PayloadAction<1 | 7 | 14 | 30 | 365>) {
      state.daysAgo = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setCoin, setDaysAgo } = homeSlice.actions;

//selectors go here
export const getCoin = (state: RootState) => state.home.selectedCoin;
export const getDaysAgo = (state: RootState) => state.home.daysAgo;
