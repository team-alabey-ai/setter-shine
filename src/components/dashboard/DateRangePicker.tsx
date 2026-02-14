import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DateRangePreset } from '@/lib/mockData';

interface DateRangePickerProps {
  value: DateRangePreset;
  onChange: (value: DateRangePreset) => void;
  customRange?: { start: Date; end: Date };
  onCustomRangeChange?: (range: { start: Date; end: Date }) => void;
}

const presetLabels: Record<DateRangePreset, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7: 'Last 7 Days',
  last14: 'Last 14 Days',
  last30: 'Last 30 Days',
  custom: 'Custom Range',
};

const DateRangePicker = ({ value, onChange, customRange, onCustomRangeChange }: DateRangePickerProps) => {
  const [showCustom, setShowCustom] = useState(false);
  const [tempFrom, setTempFrom] = useState<Date | undefined>(customRange?.start);
  const [tempTo, setTempTo] = useState<Date | undefined>(customRange?.end);

  const handlePresetChange = (v: string) => {
    if (v === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      onChange(v as DateRangePreset);
    }
  };

  const handleApplyCustom = () => {
    if (tempFrom && tempTo && onCustomRangeChange) {
      onCustomRangeChange({ start: tempFrom, end: tempTo });
      onChange('custom');
      setShowCustom(false);
    }
  };

  const displayLabel = value === 'custom' && customRange
    ? `${format(customRange.start, 'MMM d')} – ${format(customRange.end, 'MMM d')}`
    : undefined;

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-full sm:w-[180px] h-9 bg-input border-border text-foreground justify-start text-left">
          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
          {displayLabel ? (
            <span className="truncate">{displayLabel}</span>
          ) : (
            <SelectValue placeholder="Select range" className="text-left" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {Object.entries(presetLabels).map(([key, label]) => (
            <SelectItem
              key={key}
              value={key}
              className="text-foreground hover:bg-accent focus:bg-accent"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {showCustom && (
        <Popover open={showCustom} onOpenChange={setShowCustom}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              Pick dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 space-y-3" align="start">
            <div className="flex gap-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">From</p>
                <Calendar
                  mode="single"
                  selected={tempFrom}
                  onSelect={setTempFrom}
                  disabled={(date) => date > new Date()}
                  className={cn("p-2 pointer-events-auto")}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">To</p>
                <Calendar
                  mode="single"
                  selected={tempTo}
                  onSelect={setTempTo}
                  disabled={(date) => date > new Date() || (tempFrom ? date < tempFrom : false)}
                  className={cn("p-2 pointer-events-auto")}
                />
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              disabled={!tempFrom || !tempTo}
              onClick={handleApplyCustom}
            >
              Apply
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default DateRangePicker;
