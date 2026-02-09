import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import SparklineChart from './SparklineChart';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
  tooltip?: string;
  sparklineData?: number[];
  isLarge?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  goal?: number;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  change,
  subtitle,
  tooltip,
  sparklineData,
  isLarge = false,
  isActive = false,
  onClick,
  goal,
  className,
}: MetricCardProps) => {
  const isPositiveChange = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        'card-premium p-4 sm:p-6 cursor-pointer group',
        isLarge && 'sm:col-span-2 lg:col-span-2',
        isActive && 'ring-1 ring-accent border-accent/50',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="metric-label">{title}</span>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-popover border-border text-foreground">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {change !== undefined && (
          <div
            className={cn(
              'flex items-center gap-1 text-sm font-medium',
              isPositiveChange ? 'text-success' : 'text-destructive'
            )}
          >
            {isPositiveChange ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className={cn(isLarge ? 'metric-value-large' : 'metric-value')}>
            {value}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {goal !== undefined && goal > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Goal: {goal}</span>
                <span>{Math.min(100, Math.round((Number(value) / goal) * 100))}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-soft rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (Number(value) / goal) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {sparklineData && sparklineData.length > 0 && (
          <div className="w-24 h-12">
            <SparklineChart data={sparklineData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
