"use client";

import { useQuery } from "@tanstack/react-query";
import { getMarketSummary } from "../_services/apiCoinData";
import CoinLightning from "../_icons/CoinLightning";
import ExchangeIcon from "../_icons/ExchangeIcon";
import ChevronUp from "../_icons/ChevronUp";
import { formatLargeNumber } from "@/lib/utils";
import Progress from "./Progress";
import Image from "next/image";

function HighlightBar() {
  const { isPending, error, data } = useQuery({
    queryKey: ["market_summary"],
    queryFn: getMarketSummary,
    staleTime: 60000,
  });

  return (
    <div className="bg-light-highlight-bar dark:bg-dark-highlight-bar flex h-14 overflow-x-auto border border-[#FFFFFF1A] px-4 text-sm text-white min-[738px]:justify-center">
      {!isPending && (
        <div className="flex min-w-max items-center gap-4">
          {/* Display first three items always */}
          <p className="flex gap-1">
            <span className="flex items-center gap-1">
              <CoinLightning />
              Coins
            </span>
            <span>{data.active_cryptocurrencies}</span>
          </p>
          <p className="flex gap-1">
            <span className="flex items-center gap-1">
              <ExchangeIcon />
              Exchange
            </span>
            <span>{data.markets}</span>
          </p>
          <p className="flex items-center">
            <ChevronUp className="text-coinsTable-green" />
            {/* The currency needs to be the selected one */}
            <span>{formatLargeNumber(data.total_market_cap["usd"])}</span>
          </p>
          <p className="flex shrink-0 items-center gap-1">
            <span>${formatLargeNumber(data.total_market_cap["btc"])}</span>
            {/* The currency needs to be the selected one */}
            <div className="w-14">
              <Progress
                fillColor={"#FFFFFF"}
                backgroundColor={"#FFFFFF66"}
                value={
                  (data.total_volume["btc"] / data.total_market_cap["btc"]) *
                  100
                }
              />
            </div>
          </p>
          <p className="flex shrink-0 items-center gap-1">
            <Image
              src={
                "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
              }
              alt={"Bitcoin Image"}
              width={22}
              height={22}
            />
            <span>{Math.round(data.market_cap_percentage["btc"])}%</span>
            {/* The currency needs to be the selected one */}
            <div className="w-14">
              <Progress
                fillColor={"#FFFFFF"}
                backgroundColor={"#FFFFFF66"}
                value={data.market_cap_percentage["btc"]}
              />
            </div>
          </p>
          <p className="flex shrink-0 items-center gap-1">
            <Image
              src={
                "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
              }
              alt={"Bitcoin Image"}
              width={22}
              height={22}
            />
            <span>{Math.round(data.market_cap_percentage["eth"])}%</span>
            {/* The currency needs to be the selected one */}
            <div className="w-14">
              <Progress
                fillColor={"#FFFFFF"}
                backgroundColor={"#FFFFFF66"}
                value={data.market_cap_percentage["eth"]}
              />
            </div>
          </p>
        </div>
      )}
    </div>
  );
}

export default HighlightBar;
