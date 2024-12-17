"use client";

import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { getCoin, getDaysAgo } from "../homeSlice";

import GenericChart from "./GenericChart";
import ChevronRight from "@/app/_icons/ChevronRight";
import ChevronLeft from "@/app/_icons/ChevronLeft";

type CoinVisualOverviewProps = {
  currency: string;
};

function CoinVisualOverview({ currency }: CoinVisualOverviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showPriceChart, setShowPriceChart] = useState(true);
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const selectedCoin = useSelector(getCoin);
  const daysAgo = useSelector(getDaysAgo);

  const { isPending, error, data } = useQuery({
    queryKey: ["coin_historical_data", selectedCoin.id, currency, daysAgo],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency, _daysAgo] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(
        _coinId as string,
        _currency as string,
        _daysAgo as string,
      );
    },
    staleTime: 60000,
  });

  useEffect(function () {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full max-w-[1700px] gap-6 md-plus:mx-auto md-plus:grid md-plus:grid-cols-2">
        <div className="aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400">
          <p className="flex h-full items-center justify-center">Loading ...</p>
        </div>
        <div className="hidden aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400 md-plus:block">
          <p className="flex h-full items-center justify-center">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1500px] gap-6 md-plus:mx-auto md-plus:grid md-plus:grid-cols-2">
      {!isWideViewPort && !isPending && (
        <button
          className="absolute right-4 top-4 z-10 rounded-full border-light-100 bg-light-100 bg-opacity-40 p-2 ring-[0.67px] ring-light-100 dark:bg-opacity-70"
          onClick={() => setShowPriceChart((state) => !state)}
        >
          {showPriceChart ? <ChevronRight /> : <ChevronLeft />}
        </button>
      )}
      {/* In mobile view, this space should be shared by the PriceChart and VolumeChart. If it's spacious enough, we can display both of them side by side */}

      {(isWideViewPort || showPriceChart) && (
        <GenericChart
          selectedCoin={selectedCoin}
          days={daysAgo}
          data={data?.prices as number[][]}
          isPending={isPending}
          chartTitle={selectedCoin.name}
          lineColor={{
            borderColor: "#7878FA",
            gradientStart: "rgb(120 , 120, 250, 0.5)",
            gradientStop: "rgb(120 , 120, 250, 0.0)",
          }}
        />
      )}
      {(isWideViewPort || !showPriceChart) && (
        <GenericChart
          selectedCoin={selectedCoin}
          days={daysAgo}
          data={data?.totalVolumes as number[][]}
          isPending={isPending}
          chartTitle={`Volume: ${selectedCoin.name}`}
          lineColor={{
            borderColor: "rgba(216,120,250,1)",
            gradientStart: "rgba(216,120,250,0.5)",
            gradientStop: "rgba(216,120,250,0.0)",
          }}
        />
      )}
    </div>
  );
}

export default CoinVisualOverview;
