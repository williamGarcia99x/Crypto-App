"use client";

import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useQuery } from "@tanstack/react-query";
import PriceChart from "./PriceChart";
import VolumeChart from "./VolumeChart";
import { useState } from "react";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";

type CoinVisualOverviewProps = {
  coinId: string;
  currency: string;
  days: number;
};

function CoinVisualOverview({
  coinId,
  currency,
  days,
}: CoinVisualOverviewProps) {
  const [showPriceChart, setShowPriceChart] = useState(true);
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const { isPending, error, data } = useQuery({
    queryKey: ["coin_historical_data", coinId, currency, days],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency, _days] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(_coinId, _currency, _days);
    },
    gcTime: 30000,
  });

  if (isPending) {
    return <p>Loading Data...</p>;
  }

  return (
    <div className="relative min-[935px]:grid min-[935px]:grid-cols-2">
      {!isWideViewPort && (
        <button
          className="absolute right-4 z-50"
          onClick={() => setShowPriceChart((state) => !state)}
        >
          {showPriceChart ? "->" : "<-"}
        </button>
      )}
      {/* In mobile view, this space should be shared by the PriceChart and VolumeChart. If it's spacious enough, we can display both of them side by side */}

      {isWideViewPort || showPriceChart ? (
        <PriceChart
          xLabels={data?.prices.map((entry) => new Date(entry[0])) as Date[]}
          dataPoints={data?.prices.map((entry) => entry[1]) as number[]}
          coinId={coinId}
          days={days}
        />
      ) : null}
      {isWideViewPort || !showPriceChart ? (
        <VolumeChart
          xLabels={
            data?.totalVolumes.map((entry) => new Date(entry[0])) as Date[]
          }
          dataPoints={data?.totalVolumes.map((entry) => entry[1]) as number[]}
          coinId={coinId}
          days={days}
        />
      ) : null}
    </div>
  );
}

export default CoinVisualOverview;
