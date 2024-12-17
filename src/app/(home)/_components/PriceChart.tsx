"use client";


import "chartjs-adapter-date-fns";
import { useQuery } from "@tanstack/react-query";
import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import LineChart from "@/app/_components/LineChart";
import tailwindConfig from "@tailwind";

import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);



type PriceChartProps = {
  xLabels: unknown[];
  dataPoints: number[];
  coinId: string;
  days: number;
};

export default function PriceChart({
  coinId,
  days,
  xLabels,
  dataPoints,
}: PriceChartProps) {
  return (
    <div className="w-full">
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
  );
}
