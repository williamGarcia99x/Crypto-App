import ChevronDown from "@/app/_icons/ChevronDown";
import ChevronUp from "@/app/_icons/ChevronUp";

import { CoinDescriptionLong, ColorChartSpecs } from "@/lib/types";
import { formatLargeNumber } from "@/lib/utils";
import Image from "next/image";
import SparkLineChart from "./SparkLineChart";
import Progress from "@/app/_components/Progress";

type TableRowProps = {
  coin: CoinDescriptionLong;
  rowColor: ColorChartSpecs;
};

function TableRow({ coin, rowColor }: TableRowProps) {
  const volumeMarketCapBar = {
    start: Number(coin.total_volume.toFixed(2)),
    end: Number(coin.market_cap.toFixed(2)),
    percentFull: (coin.total_volume / coin.market_cap) * 100,
  };
  const circulatingTotalSupplyBar = {
    start: Number(coin.circulating_supply.toFixed(2)),
    end: Number(coin.total_supply.toFixed(2)),
    percentFull: (coin.circulating_supply / coin.total_supply) * 100,
  };

  return (
    <div
      key={coin.id}
      className="grid grid-cols-[150px_100px_70px] items-center justify-between rounded-xl bg-white px-4 py-3 dark:bg-dark-350 min-[450px]:grid-cols-[150px_100px_70px_70px] min-[530px]:grid-cols-[150px_100px_70px_70px_70px] md:grid-cols-[150px_100px_70px_70px_70px_180px] lg:grid-cols-[150px_100px_70px_70px_70px_180px_180px] xl:grid-cols-[150px_100px_70px_70px_70px_180px_180px_180px]"
    >
      <TableDescription className="flex items-center gap-2">
        <figure className="relative block h-8 w-8 flex-shrink-0">
          <Image
            alt={`image of ${coin.image}`}
            src={coin.image}
            fill
            sizes="32x32"
            className="object-contain"
          />
        </figure>
        <div className="flex flex-col">
          <p className="uppercase md:text-lg">{coin.symbol}</p>
          <p className="text-xs md:text-sm">{coin.name}</p>
        </div>
      </TableDescription>
      {/* 2nd column */}
      <TableDescription className="">${coin.current_price}</TableDescription>
      {/* 3rd column */}
      <TableDescription className="">
        <PriceChangePercentageDisplay
          priceChangePercentageInCurrency={
            coin.price_change_percentage_1h_in_currency
          }
        />
      </TableDescription>
      {/* 4th column */}
      <TableDescription className="hidden min-[450px]:block">
        <PriceChangePercentageDisplay
          priceChangePercentageInCurrency={
            coin.price_change_percentage_24h_in_currency
          }
        />
      </TableDescription>
      {/* 5th column */}
      <TableDescription className="hidden min-[530px]:block">
        <PriceChangePercentageDisplay
          priceChangePercentageInCurrency={
            coin.price_change_percentage_7d_in_currency
          }
        />
      </TableDescription>
      {/* 6th column */}
      <TableDescription className="hidden md:block">
        <div className="flex justify-between text-sm">
          <span>{formatLargeNumber(volumeMarketCapBar.start)}</span>
          <span>{formatLargeNumber(volumeMarketCapBar.end)}</span>
        </div>
        <Progress
          fillColor={rowColor.borderColor}
          backgroundColor={rowColor.progressBarBgColor}
          value={volumeMarketCapBar.percentFull}
        />
      </TableDescription>
      {/* 7th column */}
      <TableDescription className="hidden lg:block">
        <div className="flex justify-between text-sm">
          <span>{formatLargeNumber(circulatingTotalSupplyBar.start)}</span>
          <span>{formatLargeNumber(circulatingTotalSupplyBar.end)}</span>
        </div>
        <Progress
          fillColor={rowColor.borderColor}
          backgroundColor={rowColor.progressBarBgColor}
          value={circulatingTotalSupplyBar.percentFull}
        />
      </TableDescription>
      {/* 8th column */}
      <TableDescription className="relative hidden xl:block">
        <SparkLineChart
          data={coin.sparkline_in_7d.price}
          lineColor={rowColor}
        />
      </TableDescription>
    </div>
  );
}

export default TableRow;

function PriceChangePercentageDisplay({
  priceChangePercentageInCurrency,
}: {
  priceChangePercentageInCurrency: number;
}) {
  return (
    <p
      className={`flex -translate-x-2 ${priceChangePercentageInCurrency < 0 ? "text-coinsTable-red" : "text-coinsTable-green"}`}
    >
      <span className="relative">
        {priceChangePercentageInCurrency < 0 ? <ChevronDown /> : <ChevronUp />}
      </span>
      <span>{Math.abs(priceChangePercentageInCurrency).toFixed(2)}%</span>
    </p>
  );
}

function TableDescription({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
