import CoinLightning from "../_icons/CoinLightning";
import ExchangeIcon from "../_icons/ExchangeIcon";
import ChevronUp from "../_icons/ChevronUp";
import { formatLargeNumber } from "@/lib/utils";
import Progress from "./Progress";
import Image from "next/image";

function HighlightBar({ data }: { data: any }) {
  return (
    <div className="custom-scrollbar flex h-14 overflow-x-auto border border-[#FFFFFF1A] bg-light-highlight-bar px-4 text-sm text-white dark:bg-dark-highlight-bar min-[738px]:justify-center">
      <div className="flex min-w-max items-center gap-4">
        {/* Display first three items always */}
        <div className="flex gap-1">
          <span className="flex items-center gap-1">
            <CoinLightning />
            Coins
          </span>
          <span>{data.active_cryptocurrencies}</span>
        </div>
        <div className="flex gap-1">
          <span className="flex items-center gap-1">
            <ExchangeIcon />
            Exchange
          </span>
          <span>{data.markets}</span>
        </div>
        <div className="flex items-center">
          <ChevronUp className="text-coinsTable-green" />
          {/* The currency needs to be the selected one */}
          <span>{formatLargeNumber(data.total_market_cap["usd"])}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span>${formatLargeNumber(data.total_market_cap["btc"])}</span>
          {/* The currency needs to be the selected one */}
          <div className="w-14">
            <Progress
              fillColor={"#FFFFFF"}
              backgroundColor={"#FFFFFF66"}
              value={
                (data.total_volume["btc"] / data.total_market_cap["btc"]) * 100
              }
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
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
        </div>
        <div className="flex shrink-0 items-center gap-1">
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
        </div>
      </div>
    </div>
  );
}

export default HighlightBar;
