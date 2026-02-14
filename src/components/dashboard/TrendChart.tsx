import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { DailyData } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';

interface TrendChartProps {
  data: DailyData[];
  primaryMetric: keyof DailyData;
  secondaryMetric?: keyof DailyData;
  title: string;
}

const metricLabels: Record<string, string> = {
  meetings_booked: 'Meetings Booked',
  total_inbound_dms: 'Inbound DMs',
  new_follower_outbounds: 'Outbound DMs',
  qualified_count: 'Qualified',
  total_follow_ups: 'Follow Ups',
  total_conversations: 'Total Conversations',
};

const TrendChart = ({ data, primaryMetric, secondaryMetric, title }: TrendChartProps) => {
  const chartData = data.map((d) => ({
    ...d,
    displayDate: format(parseISO(d.date), 'MM-dd'),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}: <span className="text-foreground font-medium">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-premium p-4 sm:p-6 overflow-hidden">
      <h3 className="section-title mb-4 sm:mb-6">{title}</h3>
      <div className="h-[220px] sm:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
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
            {secondaryMetric && (
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => (
                  <span className="text-muted-foreground text-sm">{value}</span>
                )}
              />
            )}
            <Line
              type="monotone"
              dataKey={primaryMetric}
              name={metricLabels[primaryMetric] || primaryMetric}
              stroke="hsl(223, 100%, 45%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: 'hsl(223, 100%, 45%)' }}
              animationDuration={500}
            />
            {secondaryMetric && (
              <Line
                type="monotone"
                dataKey={secondaryMetric}
                name={metricLabels[secondaryMetric] || secondaryMetric}
                stroke="hsl(220, 60%, 60%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'hsl(220, 60%, 60%)' }}
                strokeDasharray="5 5"
                animationDuration={500}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
