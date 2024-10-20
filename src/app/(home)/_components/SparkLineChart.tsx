import LineChart from "@/app/_components/LineChart";
import { ColorChartSpecs } from "@/lib/types";
import { subHours } from "date-fns";

type SparkLineChartProps = {
  data: number[];
  lineColor: ColorChartSpecs;
};

function SparkLineChart({ data, lineColor }: SparkLineChartProps) {
  /*The number of entries in the sparkline array is 168. Each element represents the value y-element (datapoint) at x-position current_time - (167 - i)  where 0 <= i <= 167*/

  const xLabels = [];
  const currentDate = new Date();
  for (let i = data.length; i > 0; i--) {
    xLabels.push(subHours(currentDate, i));
  }

  return (
    <LineChart
      xLabels={xLabels}
      dataPoints={data}
      lineColor={lineColor}
      options={{
        days: 7,
      }}
      isSpark7dChart
    />
  );
}

export default SparkLineChart;

// 167 * 24
