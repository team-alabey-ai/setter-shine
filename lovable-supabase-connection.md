# Connecting Lovable Project to Supabase

This guide explains how to connect your Lovable project to Supabase using Lovable's built-in connector integration.

## Prerequisites

- Active Lovable.dev account with your project
- Supabase project created with the `metrics_daily` table
- Supabase project credentials (URL and anon key)

## Step 1: Access Lovable Connectors

1. Open your project in [Lovable.dev](https://lovable.dev)
2. In the left sidebar, navigate to **Connectors** (under the Connectors section)
3. You'll see the "Browse connectors" page with available integrations

## Step 2: Set Up Supabase Connector

1. Locate the **Supabase** connector card (shown with green lightning bolt icon)
2. Click the **"Set up"** button on the Supabase card
3. A configuration modal will appear

## Step 3: Configure Supabase Connection

In the configuration modal, you'll need to provide:

### Required Information:

1. **Project URL**: Your Supabase project URL
   - Format: `https://[project-ref].supabase.co`
   - Find this in: Supabase Dashboard → Project Settings → API → Project URL

2. **Anon/Public Key**: Your Supabase anonymous key
   - This is the public API key safe for browser use
   - Find this in: Supabase Dashboard → Project Settings → API → Project API keys → `anon` `public`

### How to Find Your Credentials:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **Settings** (gear icon in sidebar)
4. Navigate to **API** section
5. Copy:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 4: Complete the Integration

1. Paste your Supabase URL in the URL field
2. Paste your anon key in the API key field
3. Click **"Connect"** or **"Save"**
4. Lovable will verify the connection

## Step 5: Update Your Code in Lovable

Once connected, you need to ensure your Lovable project uses the Supabase integration:

### 1. Remove Local Environment Variables

In Lovable, you **don't need** `.env.local` files. The connector handles authentication automatically.

### 2. Update Supabase Client

Your `src/integrations/supabase/client.ts` should be configured to use Lovable's environment:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

Lovable's Supabase connector will automatically inject `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.

### 3. Ensure Your Database Types Match

Make sure `src/integrations/supabase/types.ts` matches your actual Supabase schema:

```typescript
export interface Database {
  public: {
    Tables: {
      metrics_daily: {
        Row: {
          id: string
          tenant_id: string
          day: string
          meetings_booked: number
          whop_checkouts: number
          inbound_dms: number
          follow_ups: number
          outbounds: number
          outbounds_answered: number
          source: string
          total_messages_sent: number
          meeting_links_sent: number
          checkout_links_sent: number
        }
        // ... Insert and Update types
      }
    }
  }
}
```

### 4. Use the Hooks

Your dashboard should use the Supabase hooks as configured:

```typescript
import { useMetricsDaily } from '@/hooks/useMetricsDaily';

const Index = () => {
  const { data: metricsData, isLoading, error } = useMetricsDaily();
  // ... rest of your component
};
```

## Step 6: Deploy and Test

1. **Save your changes** in Lovable
2. **Preview** your application using Lovable's preview
3. Check the browser console for any errors
4. Verify data loads from Supabase correctly

## Verifying the Connection

### In Lovable Preview:

1. Open your Lovable preview
2. Open browser DevTools (F12)
3. Go to the **Console** tab
4. Look for any Supabase connection errors
5. Check the **Network** tab for API calls to `supabase.co`

### Expected Behavior:

✅ Data loads from your Supabase `metrics_daily` table  
✅ Filtered by tenant_id: `7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a`  
✅ Dashboard displays metrics correctly  
✅ No authentication errors in console  

## Troubleshooting

### Connection Failed

**Problem**: "Failed to connect to Supabase"

**Solutions**:
- Verify your Project URL is correct (should start with `https://`)
- Ensure you're using the **anon** key, not the service_role key
- Check that your Supabase project is active

### No Data Loading

**Problem**: Dashboard shows "No metrics data available"

**Solutions**:
- Verify data exists in your `metrics_daily` table
- Check the `tenant_id` matches: `7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a`
- Ensure RLS (Row Level Security) policies allow public read access
- Run this SQL in Supabase SQL Editor:
  ```sql
  SELECT * FROM metrics_daily WHERE tenant_id = '7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a';
  ```

### RLS Policy Issues

**Problem**: "Row Level Security policy violation"

**Solution**: Create an RLS policy in Supabase:

```sql
-- Enable RLS
ALTER TABLE metrics_daily ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading data
CREATE POLICY "Allow public read access"
ON metrics_daily FOR SELECT
TO public
USING (true);
```

Or for tenant-specific access:

```sql
CREATE POLICY "Allow tenant read access"
ON metrics_daily FOR SELECT
TO public
USING (tenant_id = '7f3d9c2a-6b61-4f1a-9a7b-3f2d4c8e1b6a');
```

### Type Errors

**Problem**: TypeScript errors about mismatched types

**Solutions**:
- Ensure `src/integrations/supabase/types.ts` matches your actual schema
- Regenerate types from Supabase (in Supabase Dashboard → API Docs → TypeScript)
- Verify column names match exactly (e.g., `day` not `date`)

## Key Differences: Lovable vs Local Development

| Aspect | Local Development | Lovable Platform |
|--------|------------------|------------------|
| Environment Variables | `.env.local` file | Connector integration |
| Setup | Manual npm install | Automatic via connector |
| Credentials | Manually copied | UI-based configuration |
| Updates | Manual code changes | Managed by platform |
| Testing | `npm run dev` | Lovable preview |

## Files Structure in Lovable

Your Lovable project should have these files:

```
src/
├── integrations/
│   └── supabase/
│       ├── client.ts         # Supabase client instance
│       ├── types.ts          # Database type definitions
│       └── index.ts          # Exports
├── hooks/
│   └── useMetricsDaily.ts   # React Query hooks
├── lib/
│   └── constants.ts          # Tenant ID configuration
└── pages/
    └── Index.tsx             # Main dashboard using Supabase data
```

## Next Steps After Connection

1. ✅ **Verify connection** in Lovable preview
2. ✅ **Test data loading** with real metrics
3. ✅ **Configure RLS policies** in Supabase for security
4. ✅ **Add authentication** if needed for multi-tenant support
5. ✅ **Deploy** your Lovable project

## Security Best Practices

### For Production:

1. **Enable Row Level Security (RLS)** on all tables
2. **Create specific policies** for your use case
3. **Use authentication** for user-specific data
4. **Never expose service_role key** - only use anon key in frontend
5. **Validate tenant_id** on the backend if multi-tenant

### Example RLS Policy for Multi-Tenant:

```sql
-- Users can only read their own tenant data
CREATE POLICY "Users can read own tenant data"
ON metrics_daily FOR SELECT
TO authenticated
USING (tenant_id = auth.jwt() ->> 'tenant_id');
```

## Support

If you encounter issues:

1. Check [Lovable Documentation](https://docs.lovable.dev)
2. Visit [Supabase Documentation](https://supabase.com/docs)
3. Check browser console for specific error messages
4. Contact Lovable support through the platform

---

**Last Updated**: January 2026  
**Compatible with**: Lovable.dev Platform, Supabase v2+
