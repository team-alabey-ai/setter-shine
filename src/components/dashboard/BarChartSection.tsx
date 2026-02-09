import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { DailyData } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';

interface BarChartSectionProps {
  data: DailyData[];
  title: string;
}

const BarChartSection = ({ data, title }: BarChartSectionProps) => {
  const chartData = data.map((d) => ({
    ...d,
    displayDate: format(parseISO(d.date), 'MM-dd'),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <p className="text-sm text-muted-foreground">
            Follow Ups: <span className="text-foreground font-medium">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-premium p-4 sm:p-6 overflow-hidden">
      <h3 className="section-title mb-4 sm:mb-6">{title}</h3>
      <div className="h-[180px] sm:h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(225, 20%, 18%)" vertical={false} />
            <XAxis
              dataKey="displayDate"
              stroke="hsl(220, 15%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(220, 15%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="total_follow_ups"
              fill="hsl(223, 60%, 25%)"
              radius={[4, 4, 0, 0]}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartSection;
