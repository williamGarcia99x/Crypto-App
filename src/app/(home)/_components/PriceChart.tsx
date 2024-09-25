"use client";

import "chartjs-adapter-date-fns";

import LineChart from "@/app/_components/LineChart";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { CoinDescriptionShort } from "@/lib/types";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

type PriceChartProps = {
  selectedCoin: CoinDescriptionShort;
  days: number;
  priceData: number[][];
  isPending: boolean;
};

export default function PriceChart({
  selectedCoin,
  days,
  priceData,
  isPending,
}: PriceChartProps) {
  const { xLabels, dataPoints } = !isPending
    ? priceData.reduce(
        (acc, el) => {
          acc.xLabels.push(new Date(el[0]));
          acc.dataPoints.push(el[1]);
          return acc;
        },
        {
          xLabels: [] as Date[],
          dataPoints: [] as number[],
        },
      )
    : { xLabels: [], dataPoints: [] };

  return (
    <div className="aspect-2/1 rounded-2xl p-4 shadow-md dark:bg-dark-400">
      {isPending ? (
        <p className="flex h-full items-center justify-center">Loading ...</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-normal text-[#191932] dark:text-[#E8E8E8]">
              <span>{selectedCoin.name} </span>
              <span className="uppercase">({selectedCoin.symbol})</span>
            </p>
            <p className="text-xl font-bold dark:font-normal">
              ${Math.round(dataPoints.at(-1) as number)}
            </p>
          </div>
          <LineChart
            xLabels={xLabels}
            dataPoints={dataPoints}
            options={{ days }}
            lineColor={[
              "#7878FA",
              "rgb(120 , 120, 250, 0.5)",
              "rgb(120 , 120, 250, 0.0)",
            ]}
          />
        </div>
      )}
    </div>
  );
}
