import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterDropdownProps {
  label: string;
  options: string[];
  placeholder: string;
}

const FilterDropdown = ({ label, options, placeholder }: FilterDropdownProps) => {
  const [value, setValue] = useState(options[0]);

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full sm:w-[140px] h-9 bg-input border-border text-foreground text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="text-foreground hover:bg-accent focus:bg-accent text-sm"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
