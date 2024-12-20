"use client";

import "chartjs-adapter-date-fns";

import LineChart from "@/app/_components/LineChart";
import tailwindConfig from "@tailwind";
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

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const colors = {
  primaryLine: tailwindConfig.theme?.colors?.cryptoblue["700"] as string,
};

type VolumeChartProps = {
  xLabels: unknown[];
  dataPoints: number[];
  coinId: string;
  days: number;
};

export default function VolumeChart({
  coinId,
  days,
  xLabels,
  dataPoints,
}: VolumeChartProps) {
  return (
    <div>
      <div className="w-full ">
        <div className="relative left-2">
          <p>{coinId}</p>
          <p>${Math.round(dataPoints.at(-1) as number)}</p>
        </div>
        <LineChart
          xLabels={xLabels}
          dataPoints={dataPoints}
          coinName={coinId}
          options={{ days }}
        />
      </div>
    </div>
  );
}
