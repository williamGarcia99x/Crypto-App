"use client";

import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useQuery } from "@tanstack/react-query";
import PriceChart from "./PriceChart";
import VolumeChart from "./VolumeChart";
import { useState } from "react";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { getCoin, getDaysAgo } from "../homeSlice";

type CoinVisualOverviewProps = {
  currency: string;
};

function CoinVisualOverview({ currency }: CoinVisualOverviewProps) {
  const [showPriceChart, setShowPriceChart] = useState(true);
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const selectedCoin = useSelector(getCoin);
  const daysAgo = useSelector(getDaysAgo);

  const { isPending, error, data } = useQuery({
    queryKey: ["coin_historical_data", selectedCoin.id, currency, daysAgo],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency, _daysAgo] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(_coinId, _currency, _daysAgo);
    },
    gcTime: 30000,
  });

  if (isPending) {
    return <p>Loading Data...</p>;
  }

  return (
    <div className="relative gap-6 min-[935px]:grid min-[935px]:grid-cols-2">
      {!isWideViewPort && (
        <button
          className="absolute right-4 z-50"
          onClick={() => setShowPriceChart((state) => !state)}
        >
          {showPriceChart ? "->" : "<-"}
        </button>
      )}
      {/* In mobile view, this space should be shared by the PriceChart and VolumeChart. If it's spacious enough, we can display both of them side by side */}

      {(isWideViewPort || showPriceChart) && (
        <PriceChart
          selectedCoin={selectedCoin}
          days={daysAgo}
          priceData={data?.prices as number[][]}
        />
      )}
      {(isWideViewPort || !showPriceChart) && (
        <VolumeChart
          selectedCoin={selectedCoin}
          days={daysAgo}
          volumeData={data?.totalVolumes as number[][]}
        />
      )}
    </div>
  );
}

export default CoinVisualOverview;
