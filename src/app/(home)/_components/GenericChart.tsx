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
import { CoinDescriptionShort, ColorChartSpecs } from "@/lib/types";

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
  data: number[][];
  isPending: boolean;
  chartTitle: string;
  lineColor: ColorChartSpecs;
};

export default function GenericChart({
  selectedCoin,
  days,
  data,
  isPending,
  chartTitle,
  lineColor,
}: PriceChartProps) {
  const { xLabels, dataPoints } = !isPending
    ? data.reduce(
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
    <div className="relative aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400">
      {isPending && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2">
          <p className="">Loading ...</p>
        </div>
      )}
      {/* if data isPending, add an opacity layer to hide the display of the chart with no data*/}
      <div className={`flex flex-col gap-5 ${isPending && "z-50 opacity-0"}`}>
        <div>
          <p className="font-normal text-[#191932] dark:text-[#E8E8E8]">
            <span>{chartTitle} </span>
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
          lineColor={lineColor}
        />
      </div>
    </div>
  );
}
