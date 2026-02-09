import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRangePreset } from '@/lib/mockData';

interface DateRangePickerProps {
  value: DateRangePreset;
  onChange: (value: DateRangePreset) => void;
}

const presetLabels: Record<DateRangePreset, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  last7: 'Last 7 Days',
  last14: 'Last 14 Days',
  last30: 'Last 30 Days',
  custom: 'Custom Range',
};

const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as DateRangePreset)}>
      <SelectTrigger className="w-full sm:w-[160px] h-9 bg-input border-border text-foreground justify-start text-left">
        <Calendar className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
        <SelectValue placeholder="Select range" className="text-left" />
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
  );
};

export default DateRangePicker;
