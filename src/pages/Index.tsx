import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import Header from '@/components/dashboard/Header';
import MetricCard from '@/components/dashboard/MetricCard';
import TrendChart from '@/components/dashboard/TrendChart';
import BarChartSection from '@/components/dashboard/BarChartSection';
import TopDaysTable from '@/components/dashboard/TopDaysTable';
import MetricToggle from '@/components/dashboard/MetricToggle';
import EmptyState from '@/components/dashboard/EmptyState';
import { useMetricsDaily } from '@/hooks/useMetricsDaily';
import {
  DailyData,
  DateRangePreset,
  getDateRangeFromPreset,
  filterByDateRange,
  getPreviousPeriodData,
  sumMetric,
  computeQualifiedPct,
  computeConversationsPerMeetingPct,
  computeConversationsPerMeetingRatio,
  calculatePercentageChange,
  metricDefinitions,
} from '@/lib/mockData';

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRangePreset>('last7');
  const [selectedChartMetric, setSelectedChartMetric] = useState<keyof DailyData>('meetings_booked');
  const [showSecondaryMetric, setShowSecondaryMetric] = useState(false);
  const [meetingsGoal, setMeetingsGoal] = useState<number>(0);

  // Fetch real data from Supabase
  const { data: metricsData, isLoading, error } = useMetricsDaily();

  // Filter data based on date range
  const { currentData, previousData } = useMemo(() => {
    if (!metricsData || metricsData.length === 0) {
      return { currentData: [], previousData: [] };
    }
    const { start, end } = getDateRangeFromPreset(dateRange);
    const current = filterByDateRange(metricsData, start, end);
    const previous = getPreviousPeriodData(metricsData, start, end);
    return { currentData: current, previousData: previous };
  }, [dateRange, metricsData]);

  // Compute metrics
  const metrics = useMemo(() => {
    const meetingsBooked = sumMetric(currentData, 'meetings_booked');
    const prevMeetings = sumMetric(previousData, 'meetings_booked');

    const inboundDMs = sumMetric(currentData, 'total_inbound_dms');
    const prevInbound = sumMetric(previousData, 'total_inbound_dms');

    const outbounds = sumMetric(currentData, 'new_follower_outbounds');
    const prevOutbounds = sumMetric(previousData, 'new_follower_outbounds');

    const followUps = sumMetric(currentData, 'total_follow_ups');
    const prevFollowUps = sumMetric(previousData, 'total_follow_ups');

    const qualifiedPct = computeQualifiedPct(currentData);
    const prevQualifiedPct = computeQualifiedPct(previousData);

    const convPerMeetingPct = computeConversationsPerMeetingPct(currentData);
    const prevConvPerMeetingPct = computeConversationsPerMeetingPct(previousData);

    const convPerMeetingRatio = computeConversationsPerMeetingRatio(currentData);

    return {
      meetingsBooked,
      meetingsChange: calculatePercentageChange(meetingsBooked, prevMeetings),
      inboundDMs,
      inboundChange: calculatePercentageChange(inboundDMs, prevInbound),
      outbounds,
      outboundsChange: calculatePercentageChange(outbounds, prevOutbounds),
      followUps,
      followUpsChange: calculatePercentageChange(followUps, prevFollowUps),
      qualifiedPct,
      qualifiedPctChange: qualifiedPct - prevQualifiedPct,
      convPerMeetingPct,
      convPerMeetingPctChange: convPerMeetingPct - prevConvPerMeetingPct,
      convPerMeetingRatio,
    };
  }, [currentData, previousData]);

  // Sparkline data for meetings
  const meetingsSparkline = useMemo(() => {
    return currentData.map((d) => d.meetings_booked);
  }, [currentData]);

  // Client name placeholder - will be replaced with real data later
  const clientName = '{Client}';

  const handleMetricClick = (metric: keyof DailyData) => {
    setSelectedChartMetric(metric);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          clientName={clientName}
        />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading metrics data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          clientName={clientName}
        />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <EmptyState
            title="Failed to load metrics"
            description={error.message}
            action={{
              label: "Retry",
              onClick: () => window.location.reload()
            }}
          />
        </main>
      </div>
    );
  }

  // No data state
  if (!metricsData || metricsData.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          clientName={clientName}
        />
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <EmptyState
            title="No metrics data available"
            description="There's no data in the metrics_daily table for your tenant. Please add some data to get started."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        clientName={clientName}
      />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* North Star Section */}
        <section className="animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="section-title">North Star</h2>
            <span className="section-subtitle hidden sm:inline">— Primary success metric</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <MetricCard
              title="Meetings Booked"
              value={metrics.meetingsBooked}
              change={metrics.meetingsChange}
              tooltip={metricDefinitions.meetings_booked}
              sparklineData={meetingsSparkline}
              isLarge
              isActive={selectedChartMetric === 'meetings_booked'}
              onClick={() => handleMetricClick('meetings_booked')}
              goal={meetingsGoal}
            />
            <MetricCard
              title="Qualified %"
              value={`${metrics.qualifiedPct.toFixed(1)}%`}
              change={metrics.qualifiedPctChange}
              tooltip={metricDefinitions.qualified_pct}
              isActive={selectedChartMetric === 'qualified_count'}
              onClick={() => handleMetricClick('qualified_count')}
            />
            <MetricCard
              title="Conv. per Meeting"
              value={`${metrics.convPerMeetingPct.toFixed(1)}%`}
              change={metrics.convPerMeetingPctChange}
              subtitle={`1 per ${metrics.convPerMeetingRatio.toFixed(1)} convos`}
              tooltip={metricDefinitions.conversations_per_meeting}
            />
          </div>
        </section>

        {/* Core Funnel Metrics */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="section-title">Core Funnel</h2>
            <span className="section-subtitle hidden sm:inline">— Activity metrics</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <MetricCard
              title="Total Inbound DMs"
              value={metrics.inboundDMs}
              change={metrics.inboundChange}
              tooltip={metricDefinitions.total_inbound_dms}
              isActive={selectedChartMetric === 'total_inbound_dms'}
              onClick={() => handleMetricClick('total_inbound_dms')}
            />
            <MetricCard
              title="New Follower Outbounds"
              value={metrics.outbounds}
              change={metrics.outboundsChange}
              tooltip={metricDefinitions.new_follower_outbounds}
              isActive={selectedChartMetric === 'new_follower_outbounds'}
              onClick={() => handleMetricClick('new_follower_outbounds')}
            />
            <MetricCard
              title="Total Follow Ups"
              value={metrics.followUps}
              change={metrics.followUpsChange}
              tooltip={metricDefinitions.total_follow_ups}
              isActive={selectedChartMetric === 'total_follow_ups'}
              onClick={() => handleMetricClick('total_follow_ups')}
            />
          </div>
        </section>

        {/* Trends Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="section-title">Trends</h2>
              <span className="section-subtitle hidden sm:inline">— Performance over time</span>
            </div>
            <MetricToggle
              selectedMetric={selectedChartMetric}
              onMetricChange={setSelectedChartMetric}
              showSecondary={showSecondaryMetric}
              onToggleSecondary={() => setShowSecondaryMetric(!showSecondaryMetric)}
            />
          </div>
          <TrendChart
            data={currentData}
            primaryMetric={selectedChartMetric}
            secondaryMetric={showSecondaryMetric ? 'total_inbound_dms' : undefined}
            title={`${selectedChartMetric === 'meetings_booked' ? 'Meetings Booked' : selectedChartMetric.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} by Day`}
          />
        </section>

        {/* Quality & Follow-up Section */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="section-title">Quality & Follow-up</h2>
            <span className="section-subtitle hidden sm:inline">— Engagement analysis</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <BarChartSection data={currentData} title="Follow Ups by Day" />
            <TopDaysTable data={currentData} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2025 Linden AI. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            setters.lindenpartners.ai
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
