import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase';
import { Tables } from '@/integrations/supabase/types';

type MetricsDailyRow = Tables<'metrics_daily'>;
import { CURRENT_TENANT_ID } from '@/lib/constants';
import { DailyData } from '@/lib/mockData';

/**
 * Hook to fetch metrics_daily data from Supabase
 * Filters by the current tenant ID and orders by day
 */
export const useMetricsDaily = () => {
  return useQuery<DailyData[], Error>({
    queryKey: ['metrics_daily', CURRENT_TENANT_ID],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics_daily')
        .select('*')
        .eq('tenant_id', CURRENT_TENANT_ID)
        .order('day', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch metrics: ${error.message}`);
      }

      if (!data) {
        return [];
      }

      // Transform Supabase data to match DailyData interface
      return data.map((row: MetricsDailyRow) => {
        const totalConversations = row.inbound_dms + row.outbounds;
        // Estimate qualified_count as outbounds_answered + portion of inbound
        const qualifiedCount = row.outbounds_answered + Math.floor(row.inbound_dms * 0.3);
        
        return {
          date: row.day,
          total_inbound_dms: row.inbound_dms,
          new_follower_outbounds: row.outbounds,
          total_conversations: totalConversations,
          qualified_count: qualifiedCount,
          meetings_booked: row.meetings_booked,
          total_follow_ups: row.follow_ups,
        };
      });
    },
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch metrics for a specific date range
 */
export const useMetricsByDateRange = (startDate: Date, endDate: Date) => {
  return useQuery<DailyData[], Error>({
    queryKey: ['metrics_daily', CURRENT_TENANT_ID, startDate.toISOString(), endDate.toISOString()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics_daily')
        .select('*')
        .eq('tenant_id', CURRENT_TENANT_ID)
        .gte('day', startDate.toISOString().split('T')[0])
        .lte('day', endDate.toISOString().split('T')[0])
        .order('day', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch metrics: ${error.message}`);
      }

      if (!data) {
        return [];
      }

      return data.map((row: MetricsDailyRow) => {
        const totalConversations = row.inbound_dms + row.outbounds;
        const qualifiedCount = row.outbounds_answered + Math.floor(row.inbound_dms * 0.3);
        
        return {
          date: row.day,
          total_inbound_dms: row.inbound_dms,
          new_follower_outbounds: row.outbounds,
          total_conversations: totalConversations,
          qualified_count: qualifiedCount,
          meetings_booked: row.meetings_booked,
          total_follow_ups: row.follow_ups,
        };
      });
    },
    enabled: !!startDate && !!endDate,
    staleTime: 1000 * 60 * 5,
  });
};
