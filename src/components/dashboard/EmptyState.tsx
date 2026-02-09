import { TrendingUp } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = 'No data available',
  description = 'Data will appear here once activity is recorded.',
}: EmptyStateProps) => {
  return (
    <div className="card-premium p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <TrendingUp className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
