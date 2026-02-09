// Mock data for the Setter Dashboard
// This simulates daily data that would come from GoHighLevel/CRM

export interface DailyData {
  date: string;
  total_inbound_dms: number;
  new_follower_outbounds: number;
  total_conversations: number;
  qualified_count: number;
  meetings_booked: number;
  total_follow_ups: number;
}

// Exact target totals for 30 days:
// Total Inbound DMs: 123
// New Follower Outbounds: 257
// Qualified: 37.4%
// Meetings Booked: 38
// Follow ups: 274
// Total Conversations: 123 + 257 = 380
// Qualified Count: 380 * 0.374 = ~142

const generateMockData = (): DailyData[] => {
  const data: DailyData[] = [];
  const today = new Date();

  // Daily distributions that sum exactly to targets
  const dailyInbound = [4, 5, 4, 4, 4, 5, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]; // Sum: 123
  const dailyOutbound = [8, 9, 9, 9, 8, 9, 8, 9, 9, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9, 8, 9]; // Sum: 257
  const dailyMeetings = [1, 2, 0, 1, 2, 1, 0, 3, 1, 2, 0, 1, 2, 1, 0, 3, 1, 2, 0, 1, 2, 1, 0, 4, 1, 2, 0, 1, 2, 1]; // Sum: 38
  const dailyFollowUps = [9, 10, 9, 9, 9, 10, 9, 9, 9, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 9, 9, 9, 9]; // Sum: 274
  // Pre-calculated qualified counts that sum to 142 (380 * 0.374 = 142.12)
  const dailyQualified = [5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 5, 5, 5, 5, 5]; // Sum: 142

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayIndex = 29 - i;

    const inbound = dailyInbound[dayIndex];
    const outbound = dailyOutbound[dayIndex];
    const totalConversations = inbound + outbound;
    const qualifiedCount = dailyQualified[dayIndex];

    data.push({
      date: date.toISOString().split('T')[0],
      total_inbound_dms: inbound,
      new_follower_outbounds: outbound,
      total_conversations: totalConversations,
      qualified_count: qualifiedCount,
      meetings_booked: dailyMeetings[dayIndex],
      total_follow_ups: dailyFollowUps[dayIndex],
    });
  }

  return data;
};

export const mockData = generateMockData();

// Computed metrics helper functions
export const computeQualifiedPct = (data: DailyData[]): number => {
  const totalQualified = data.reduce((sum, d) => sum + d.qualified_count, 0);
  const totalConversations = data.reduce((sum, d) => sum + d.total_conversations, 0);
  return totalConversations > 0 ? (totalQualified / totalConversations) * 100 : 0;
};

export const computeConversationsPerMeetingPct = (data: DailyData[]): number => {
  const totalMeetings = data.reduce((sum, d) => sum + d.meetings_booked, 0);
  const totalConversations = data.reduce((sum, d) => sum + d.total_conversations, 0);
  return totalConversations > 0 ? (totalMeetings / totalConversations) * 100 : 0;
};

export const computeConversationsPerMeetingRatio = (data: DailyData[]): number => {
  const totalMeetings = data.reduce((sum, d) => sum + d.meetings_booked, 0);
  const totalConversations = data.reduce((sum, d) => sum + d.total_conversations, 0);
  return totalMeetings > 0 ? totalConversations / totalMeetings : 0;
};

export const sumMetric = (data: DailyData[], key: keyof DailyData): number => {
  return data.reduce((sum, d) => sum + (d[key] as number), 0);
};

// Filter data by date range
export const filterByDateRange = (
  data: DailyData[],
  startDate: Date,
  endDate: Date
): DailyData[] => {
  return data.filter((d) => {
    const date = new Date(d.date);
    return date >= startDate && date <= endDate;
  });
};

// Get previous period data for comparison
export const getPreviousPeriodData = (
  data: DailyData[],
  startDate: Date,
  endDate: Date
): DailyData[] => {
  const periodLength = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const prevEndDate = new Date(startDate);
  prevEndDate.setDate(prevEndDate.getDate() - 1);
  const prevStartDate = new Date(prevEndDate);
  prevStartDate.setDate(prevStartDate.getDate() - periodLength);

  return filterByDateRange(data, prevStartDate, prevEndDate);
};

// Calculate percentage change
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

// Date range presets
export type DateRangePreset = 'today' | 'yesterday' | 'last7' | 'last14' | 'last30' | 'custom';

export const getDateRangeFromPreset = (preset: DateRangePreset): { start: Date; end: Date } => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  switch (preset) {
    case 'today':
      return { start: startOfToday, end: today };
    case 'yesterday':
      const yesterday = new Date(startOfToday);
      yesterday.setDate(yesterday.getDate() - 1);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);
      return { start: yesterday, end: endOfYesterday };
    case 'last7':
      const start7 = new Date(startOfToday);
      start7.setDate(start7.getDate() - 6);
      return { start: start7, end: today };
    case 'last14':
      const start14 = new Date(startOfToday);
      start14.setDate(start14.getDate() - 13);
      return { start: start14, end: today };
    case 'last30':
    default:
      const start30 = new Date(startOfToday);
      start30.setDate(start30.getDate() - 29);
      return { start: start30, end: today };
  }
};

// Metric definitions for tooltips
export const metricDefinitions: Record<string, string> = {
  meetings_booked: 'Total number of meetings successfully scheduled with qualified leads.',
  total_inbound_dms: 'Direct messages received from potential leads who initiated contact.',
  new_follower_outbounds: 'Outbound messages sent to new followers as part of prospecting.',
  qualified_pct: 'Percentage of total conversations that were qualified as genuine opportunities.',
  conversations_per_meeting: 'Conversion rate showing how many conversations result in a booked meeting.',
  total_follow_ups: 'Total follow-up messages sent to maintain engagement with leads.',
};
