"use client";

import "chartjs-adapter-date-fns";

import LineChart from "@/app/_components/LineChart";
import {
  BarElement,
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
  BarElement,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
);

type VolumeChartProps = {
  volumeData: number[][];
  selectedCoin: CoinDescriptionShort;
  days: number;
  isPending: boolean;
};

export default function VolumeChart({
  selectedCoin,
  days,
  volumeData,
  isPending,
}: VolumeChartProps) {
  const { xLabels, dataPoints } =
    !isPending &&
    volumeData.reduce(
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
    <div className="aspect-2/1 rounded-2xl bg-white p-4 shadow-md dark:bg-dark-400">
      {isPending ? (
        <p className="flex h-full items-center justify-center">Loading ...</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-normal text-[#191932] dark:text-[#E8E8E8]">
              <span>Volume: {selectedCoin.name} </span>
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
              "rgba(216,120,250,1)",
              "rgba(216,120,250,0.6)",
              "rgba(216,120,250,0.1)",
            ]}
          />
        </div>
      )}
    </div>
  );
}
