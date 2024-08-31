"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useState } from "react";

export default function PriceChart() {
  const [coinId, setCoinId] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");

  const { isPending, data } = useQuery({
    queryKey: ["coin_historical_data", coinId, currency],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(_coinId, _currency);
    },
  });

  if (!isPending) {
    console.log(data);
  }

  // eslint-disable-next-line no-console

  return (
    <div className="">
      <form>
        <select value={coinId} onChange={(e) => setCoinId(e.target.value)}>
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereum</option>
          <option value="excelon">excelon</option>
        </select>
      </form>
    </div>
  );
}
