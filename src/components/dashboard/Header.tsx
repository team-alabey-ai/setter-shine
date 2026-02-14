import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import DateRangePicker from './DateRangePicker';
import FilterDropdown from './FilterDropdown';
import { DateRangePreset } from '@/lib/mockData';

interface HeaderProps {
  dateRange: DateRangePreset;
  onDateRangeChange: (preset: DateRangePreset) => void;
  clientName?: string;
  customRange?: { start: Date; end: Date };
  onCustomRangeChange?: (range: { start: Date; end: Date }) => void;
}

const Header = ({ dateRange, onDateRangeChange, clientName = '{Client}', customRange, onCustomRangeChange }: HeaderProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight">
                Linden AI
              </h1>
              <span className="text-sm text-muted-foreground">
                Setter Dashboard
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <DateRangePicker
              value={dateRange}
              onChange={onDateRangeChange}
              customRange={customRange}
              onCustomRangeChange={onCustomRangeChange}
            />
            <FilterDropdown
              label="Source"
              options={['All Sources', 'Inbound', 'Outbound']}
              placeholder="All Sources"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
