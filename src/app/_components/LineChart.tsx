"use client";
import { useTheme } from "next-themes";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "../_hooks/useMediaQuery";

type LineChartProps = {
  xLabels: unknown[];
  dataPoints: unknown[];
  lineColor: string;
  options: { days: number };
};
//#8d8db1
function LineChart({
  xLabels,
  dataPoints,
  options,
  lineColor,
}: LineChartProps) {
  const isWideViewPort = useMediaQuery("(min-width: 500px)");
  const { theme } = useTheme();

  return (
    <div className="aspect-2/1 w-full">
      <Line
        data={{
          labels: xLabels, //x-axis intervals (labels)
          datasets: [
            {
              data: dataPoints,
              borderColor: lineColor[0],
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 170);
                gradient.addColorStop(0, lineColor[1]);
                gradient.addColorStop(1, lineColor[2]);
                return gradient;
              },
              pointHoverRadius: 4,
              pointHitRadius: 12,
              pointRadius: 0,
              tension: 0.5,
              borderWidth: !isWideViewPort ? 2 : 2.5,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          backgroundColor: "#",
          scales: {
            x: {
              border: {
                width: 0,
              },
              display: "auto",
              type: "time",
              time: {
                unit: options.days === 1 ? "hour" : "day",
                displayFormats: {
                  hour: "HH:mm",
                  day: "MM/dd",
                },
              },
              ticks: {
                maxTicksLimit: 8, // Reduce the number of labels on x-axis to 7
                align: options.days === 7 ? "end" : "start",
                color: theme === "light" ? "#9c9bb6" : "#8d8db1",
                padding: 0,
              },

              grid: {
                display: false,
              },
            },
            y: {
              border: {
                width: 0,
              },
              ticks: {
                display: false,
              },
              grid: {
                display: false, // Remove the checkered background
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },

            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
