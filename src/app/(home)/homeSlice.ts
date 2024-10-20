import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CoinDescriptionShort } from "@/lib/types";

type HomeStateType = {
  selectedCoin: CoinDescriptionShort;
  daysAgo: 1 | 8 | 14 | 30 | 180 | 365;
};

const initialState: HomeStateType = {
  selectedCoin: {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  },
  daysAgo: 1,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setCoin(state, action: PayloadAction<CoinDescriptionShort>) {
      state.selectedCoin = action.payload;
    },
    setDaysAgo(state, action: PayloadAction<1 | 8 | 14 | 30 | 180 | 365>) {
      state.daysAgo = action.payload;
    },
  },
});

export default homeSlice.reducer;
export const { setCoin, setDaysAgo } = homeSlice.actions;

//selectors go here
export const getCoin = (state: RootState) => state.home.selectedCoin;
export const getDaysAgo = (state: RootState) => state.home.daysAgo;
