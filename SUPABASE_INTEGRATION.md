# Supabase Integration Guide

## Overview
This project is integrated with Supabase to fetch metrics data from the `metrics_daily` table.

**Current Tenant ID**: `7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a`

## Setup

### 1. Environment Variables
Your Supabase credentials are already configured in `.env.local`:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 2. Database Schema
The `metrics_daily` table should have the following columns:
```sql
CREATE TABLE metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID NOT NULL,
  date DATE NOT NULL,
  total_inbound_dms INTEGER NOT NULL DEFAULT 0,
  new_follower_outbounds INTEGER NOT NULL DEFAULT 0,
  total_conversations INTEGER NOT NULL DEFAULT 0,
  qualified_count INTEGER NOT NULL DEFAULT 0,
  meetings_booked INTEGER NOT NULL DEFAULT 0,
  total_follow_ups INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id, date)
);

CREATE INDEX idx_metrics_daily_tenant_date ON metrics_daily(tenant_id, date);
```

## Usage

### Using the Hook
The `useMetricsDaily` hook fetches all metrics for the current tenant:

```typescript
import { useMetricsDaily } from '@/hooks/useMetricsDaily';

const MyComponent = () => {
  const { data, isLoading, error } = useMetricsDaily();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Loaded {data.length} days of data</div>;
};
```

### Switching from Mock Data to Real Data
In `src/pages/Index.tsx`, replace:

```typescript
// OLD: Using mock data
import { mockData } from '@/lib/mockData';

// NEW: Using real Supabase data
import { useMetricsDaily } from '@/hooks/useMetricsDaily';

const Index = () => {
  const { data: metricsData, isLoading, error } = useMetricsDaily();
  
  // Use metricsData instead of mockData
  // Add loading and error states
  
  if (isLoading) {
    return <div>Loading metrics...</div>;
  }
  
  if (error) {
    return <div>Error loading metrics</div>;
  }
  
  // Continue with existing logic using metricsData
  const currentData = filterByDateRange(metricsData, start, end);
  // ...
};
```

### Example Component
See `src/components/dashboard/SupabaseDataExample.tsx` for a complete example showing:
- Loading states
- Error handling
- Data display

## Testing

### 1. Test the Connection
Add this to your Index page temporarily:

```typescript
import { SupabaseDataExample } from '@/components/dashboard/SupabaseDataExample';

// Inside your component:
<SupabaseDataExample />
```

### 2. Verify Data
Check that:
- Data loads without errors
- The correct number of records appears
- Dates are in the expected range
- All metrics fields are populated

### 3. Check Browser Console
The React Query DevTools (if installed) will show:
- Query status
- Cached data
- Refetch behavior

## Configuration

### Change Tenant ID
To use a different tenant, update `src/lib/constants.ts`:

```typescript
export const CURRENT_TENANT_ID = 'your-new-tenant-id';
```

### Query Options
The hooks use these defaults (configured in `useMetricsDaily.ts`):
- `staleTime`: 5 minutes - data stays fresh for 5 minutes
- `refetchOnWindowFocus`: true - refetches when window regains focus

Adjust these in the hook if needed.

## Troubleshooting

### "Missing Supabase environment variables"
- Check that `.env.local` exists and has both variables
- Restart your dev server after changing environment variables

### "Failed to fetch metrics"
- Verify the table name is exactly `metrics_daily`
- Check that data exists for the tenant ID
- Verify your Supabase RLS (Row Level Security) policies allow reading the data

### No Data Returned
- Confirm you have records in the table with `tenant_id = '7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a'`
- Check the date range - data might be outside your filter range

### Type Errors
- Database types are defined in `src/integrations/supabase/types.ts`
- If your schema changes, update the `Database` interface

## Files Created

- `src/integrations/supabase/client.ts` - Supabase client instance
- `src/integrations/supabase/types.ts` - Database type definitions
- `src/integrations/supabase/index.ts` - Exports
- `src/hooks/useMetricsDaily.ts` - React Query hooks for metrics
- `src/lib/constants.ts` - Configuration constants
- `src/components/dashboard/SupabaseDataExample.tsx` - Example component

## Next Steps

1. **Test the connection** - Add `<SupabaseDataExample />` to see if data loads
2. **Update Index.tsx** - Replace `mockData` with `useMetricsDaily()`
3. **Add loading states** - Handle loading and error states in your UI
4. **Test in Lovable** - Once working locally, apply the same structure in Lovable
