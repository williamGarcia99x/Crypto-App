import { Line } from "react-chartjs-2";

type LineChartProps = {
  xLabels: unknown[];
  dataPoints: unknown[];
  coinName: string;
  options: { days: number };
};

function LineChart({ xLabels, dataPoints, coinName, options }: LineChartProps) {
  return (
    <div className="w-full aspect-2/1">
      <Line
        data={{
          labels: xLabels, //x-axis intervals (labels)
          datasets: [
            {
              label: `${coinName} Price (USD)`,
              data: dataPoints,
              borderColor: "#7878FA",
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 500);
                gradient.addColorStop(0, "#7878FA");
                gradient.addColorStop(1, "rgba(120 , 120, 250, 0.0)");
                return gradient;
              },

              pointHoverRadius: 4,
              pointHitRadius: 12,
              pointRadius: 0,
              tension: 0.5,
              borderWidth: 3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            x: {
              type: "time",
              time: {
                unit: options.days === 1 ? "hour" : "day",
                displayFormats: {
                  hour: "HH:mm",
                  day: "MM/dd",
                },
              },
              ticks: {
                maxTicksLimit: 7, // Reduce the number of labels on x-axis to 7
              },
              grid: {
                display: false,
              },
            },
            y: {
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
