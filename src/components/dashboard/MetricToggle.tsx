import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DailyData } from '@/lib/mockData';

interface MetricToggleProps {
  selectedMetric: keyof DailyData;
  onMetricChange: (metric: keyof DailyData) => void;
  showSecondary: boolean;
  onToggleSecondary: () => void;
}

const metrics: { key: keyof DailyData; label: string }[] = [
  { key: 'meetings_booked', label: 'Meetings' },
  { key: 'total_inbound_dms', label: 'Inbound DMs' },
  { key: 'new_follower_outbounds', label: 'Outbounds' },
  { key: 'qualified_count', label: 'Qualified' },
  { key: 'total_follow_ups', label: 'Follow Ups' },
];

const MetricToggle = ({
  selectedMetric,
  onMetricChange,
  showSecondary,
  onToggleSecondary,
}: MetricToggleProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1 bg-muted rounded-lg p-1 overflow-x-auto max-w-full scrollbar-hide">
        {metrics.map((metric) => (
          <Button
            key={metric.key}
            variant="ghost"
            size="sm"
            onClick={() => onMetricChange(metric.key)}
            className={cn(
              'h-8 px-2 sm:px-3 text-xs sm:text-sm transition-all whitespace-nowrap flex-shrink-0',
              selectedMetric === metric.key
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-transparent'
            )}
          >
            {metric.label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSecondary}
        className={cn(
          'h-8 px-3 text-sm',
          showSecondary
            ? 'text-accent-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        {showSecondary ? '− Compare' : '+ Compare'}
      </Button>
    </div>
  );
};

export default MetricToggle;
