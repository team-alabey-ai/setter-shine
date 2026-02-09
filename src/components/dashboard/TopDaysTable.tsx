import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DailyData } from '@/lib/mockData';
import { format, parseISO } from 'date-fns';

interface TopDaysTableProps {
  data: DailyData[];
}

const TopDaysTable = ({ data }: TopDaysTableProps) => {
  // Sort by meetings booked and take top 5
  const topDays = [...data]
    .sort((a, b) => b.meetings_booked - a.meetings_booked)
    .slice(0, 5);

  return (
    <div className="card-premium p-4 sm:p-6">
      <h3 className="section-title mb-4 sm:mb-6">Top Performing Days</h3>
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <Table className="min-w-[500px] sm:min-w-0">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground font-medium">Date</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Inbound DMs</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Meetings</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Qualified %</TableHead>
              <TableHead className="text-muted-foreground font-medium text-right">Follow Ups</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topDays.map((day, index) => {
              const qualifiedPct = day.total_conversations > 0
                ? (day.qualified_count / day.total_conversations) * 100
                : 0;

              return (
                <TableRow
                  key={day.date}
                  className="border-border hover:bg-card-hover transition-colors"
                >
                  <TableCell className="text-foreground font-medium whitespace-nowrap">
                    {format(parseISO(day.date), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell className="text-foreground text-right">
                    {day.total_inbound_dms}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-foreground font-semibold">
                      {day.meetings_booked}
                    </span>
                  </TableCell>
                  <TableCell className="text-foreground text-right">
                    {qualifiedPct.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-foreground text-right">
                    {day.total_follow_ups}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TopDaysTable;
