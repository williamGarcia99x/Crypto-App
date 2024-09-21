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
};

export default function PriceChart({
  selectedCoin,
  days,
  priceData,
}: PriceChartProps) {
  const { xLabels, dataPoints } = priceData.reduce(
    (acc, el) => {
      acc.xLabels.push(new Date(el[0]));
      acc.dataPoints.push(el[1]);
      return acc;
    },
    {
      xLabels: [] as Date[],
      dataPoints: [] as number[],
    },
  );

  return (
    <div className="dark:bg-dark-400 rounded-2xl p-4 shadow-md">
      <div className="">
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
  );
}
