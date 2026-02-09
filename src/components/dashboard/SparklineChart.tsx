import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SparklineChartProps {
  data: number[];
  color?: string;
}

const SparklineChart = ({ data, color = 'hsl(223, 100%, 45%)' }: SparklineChartProps) => {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill="url(#sparklineGradient)"
          animationDuration={500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SparklineChart;
