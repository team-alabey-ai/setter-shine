import { useMetricsDaily } from '@/hooks/useMetricsDaily';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

/**
 * Example component showing how to use real Supabase data
 * Replace the mockData in Index.tsx with data from useMetricsDaily()
 */
export const SupabaseDataExample = () => {
  const { data, isLoading, error } = useMetricsDaily();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Metrics...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load metrics: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No metrics data found. Your n8n workflow will populate this dashboard with data.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Metrics Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Loaded {data.length} days of metrics data
        </p>
        <div className="space-y-2">
          {data.slice(-5).map((day) => (
            <div key={day.date} className="flex justify-between text-sm border-b pb-2">
              <span className="font-medium">{day.date}</span>
              <span>Meetings: {day.meetings_booked} | Conversations: {day.total_conversations}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
