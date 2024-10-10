"use client";

import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { getCoin, getDaysAgo } from "../homeSlice";
import { useTheme } from "next-themes";
import GenericChart from "./GenericChart";

type CoinVisualOverviewProps = {
  currency: string;
};

function CoinVisualOverview({ currency }: CoinVisualOverviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showPriceChart, setShowPriceChart] = useState(true);
  const isWideViewPort = useMediaQuery("(min-width: 935px)");
  const selectedCoin = useSelector(getCoin);
  const daysAgo = useSelector(getDaysAgo);
  const { theme } = useTheme();

  const { isPending, error, data } = useQuery({
    queryKey: ["coin_historical_data", selectedCoin.id, currency, daysAgo],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency, _daysAgo] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(_coinId, _currency, _daysAgo);
    },
    staleTime: 60000,
  });

  useEffect(function () {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="relative w-full max-w-[1700px] gap-6 min-[935px]:mx-auto min-[935px]:grid min-[935px]:grid-cols-2">
        <div className="aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400">
          <p className="flex h-full items-center justify-center">Loading ...</p>
        </div>
        <div className="hidden aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400 min-[935px]:block">
          <p className="flex h-full items-center justify-center">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[1500px] gap-6 min-[935px]:mx-auto min-[935px]:grid min-[935px]:grid-cols-2">
      {!isWideViewPort && !isPending && (
        <button
          className="absolute right-4 top-4 z-50 rounded-full border-light-100 bg-light-100 bg-opacity-40 p-2 ring-[0.67px] ring-light-100 dark:bg-opacity-70"
          onClick={() => setShowPriceChart((state) => !state)}
        >
          {showPriceChart ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke={theme === "light" ? "black" : "white"}
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          )}
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
          lineColor={[
            "#7878FA",
            "rgb(120 , 120, 250, 0.5)",
            "rgb(120 , 120, 250, 0.0)",
          ]}
        />
      )}
      {(isWideViewPort || !showPriceChart) && (
        <GenericChart
          selectedCoin={selectedCoin}
          days={daysAgo}
          data={data?.totalVolumes as number[][]}
          isPending={isPending}
          chartTitle={`Volume: ${selectedCoin.name}`}
          lineColor={[
            "rgba(216,120,250,1)",
            "rgba(216,120,250,0.6)",
            "rgba(216,120,250,0.1)",
          ]}
        />
      )}
    </div>
  );
}

export default CoinVisualOverview;
