"use client";

import { useQuery } from "@tanstack/react-query";
import { getCoinHistoricalChartData } from "@/app/_services/apiCoinData";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";
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

export default function PriceChart() {
  const [coinId, setCoinId] = useState("bitcoin");
  const [currency, setCurrency] = useState("usd");

  const { isPending, error, data } = useQuery({
    queryKey: ["coin_historical_data", coinId, currency],
    queryFn: ({ queryKey }) => {
      const [_, _coinId, _currency] = queryKey;
      if (_coinId === "") return null;
      return getCoinHistoricalChartData(_coinId, _currency);
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <h3>An error occurred: {error.message}</h3>;
  }
  //extract the time stamps
  // const timeStamps = data?.prices.map((entry) =>
  //   format(new Date(entry[0]), "MM/dd")
  // ) as string[];
  const timeStamps = data?.prices.map((entry) => new Date(entry[0])) as Date[];
  const prices = data?.prices.map((entry) => entry[1]) as number[];

  const chartData: ChartData<"line", number[], Date> = {
    labels: timeStamps, //x-axis intervals (labels)
    datasets: [
      {
        label: `${coinId} Price (USD)`,
        data: prices,
        backgroundColor: "#D878FA",
        tension: 0.7,
      },
    ],
  };

  // eslint-disable-next-line no-console
  return (
    <div className="">
      <form>
        <select value={coinId} onChange={(e) => setCoinId(e.target.value)}>
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereum</option>
          <option value="excelon">excelon</option>
        </select>
      </form>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "hour",
                },

                ticks: {
                  maxTicksLimit: 5, // Reduce the number of labels on x-axis to 5
                },
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false, // Remove the checkered background
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top", // Legend position
              },
              title: {
                display: true,
                text: `${coinId} Price Over Time (Last 24 Hours)`,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
