type ProgressProps = {
  fillColor: string;
  backgroundColor: string;
  value: number;
};

export default function Progress({
  fillColor,
  backgroundColor,
  value,
}: ProgressProps) {
  let width;
  if (value > 100) {
    width = 100;
  } else width = value < 5 ? value + 10 : value;
  return (
    <div className="w-full rounded-md" style={{ backgroundColor }}>
      <div
        className="h-2 rounded-md"
        style={{
          width: `${width}%`,
          backgroundColor: fillColor,
        }}
      ></div>
    </div>
  );
}
