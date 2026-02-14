import type { Engagement } from '@/lib/types';

/**
 * Example engagement configuration.
 * Copy this file to `engagement.ts` and customise for each client.
 */
const engagement: Engagement = {
  id: 'demo-2024-q4',
  client: 'Acme Corp',
  title: 'Q4 Performance Review',
  date: '2024-12-01',
  password: 'quicksilver',
  slides: [
    {
      id: 'overview',
      title: 'Executive Summary',
      subtitle: 'Q4 2024 at a glance',
      layout: 'kpi-row',
      kpis: [
        { label: 'Revenue', value: 2450000, previousValue: 2100000, format: 'currency' },
        { label: 'Deals Closed', value: 142, previousValue: 118, format: 'number' },
        { label: 'Win Rate', value: 34.2, previousValue: 29.8, format: 'percent', suffix: '%' },
        { label: 'Avg Deal Size', value: 17250, previousValue: 17800, format: 'currency' },
      ],
    },
    {
      id: 'pipeline',
      title: 'Pipeline Funnel',
      layout: 'funnel',
      funnelStages: [
        { label: 'Leads', value: 12500 },
        { label: 'MQLs', value: 4800 },
        { label: 'SQLs', value: 1920 },
        { label: 'Opportunities', value: 640 },
        { label: 'Closed Won', value: 142 },
      ],
    },
    {
      id: 'narrative',
      title: 'Key Insights',
      layout: 'narrative',
      narrative:
        'Q4 saw a significant uptick in enterprise deal flow driven by the new outbound motion. Win rates improved 4.4pp QoQ while average deal size held steady. The biggest opportunity for Q1 is converting the 640 open opportunities that entered the pipeline in December.',
    },
    {
      id: 'monthly-trend',
      title: 'Monthly Revenue',
      layout: 'chart',
      chartType: 'bar',
      chartData: [
        { month: 'Jul', revenue: 380000 },
        { month: 'Aug', revenue: 420000 },
        { month: 'Sep', revenue: 510000 },
        { month: 'Oct', revenue: 580000 },
        { month: 'Nov', revenue: 720000 },
        { month: 'Dec', revenue: 840000 },
      ],
    },
    {
      id: 'rep-performance',
      title: 'Rep Performance',
      layout: 'table',
      tableColumns: [
        { key: 'name', label: 'Rep', format: 'string' },
        { key: 'deals', label: 'Deals', format: 'number' },
        { key: 'revenue', label: 'Revenue', format: 'currency' },
        { key: 'winRate', label: 'Win Rate', format: 'percent' },
      ],
      tableData: [
        { name: 'Sarah Chen', deals: 28, revenue: 520000, winRate: 42.1 },
        { name: 'Marcus Johnson', deals: 24, revenue: 480000, winRate: 38.5 },
        { name: 'Priya Patel', deals: 31, revenue: 445000, winRate: 36.2 },
        { name: 'David Kim', deals: 22, revenue: 410000, winRate: 33.0 },
        { name: 'Emma Wilson', deals: 19, revenue: 350000, winRate: 28.4 },
        { name: 'James Liu', deals: 18, revenue: 245000, winRate: 25.7 },
      ],
    },
    {
      id: 'comparison',
      title: 'QoQ Comparison',
      layout: 'comparison',
      comparisonItems: [
        { label: 'Pipeline Generated', current: 8200000, previous: 6800000, format: 'currency' },
        { label: 'Pipeline Velocity', current: 45, previous: 38, format: 'number' },
        { label: 'Average Sales Cycle', current: 32, previous: 36, format: 'number' },
        { label: 'Customer Retention', current: 94.2, previous: 91.8, format: 'percent' },
      ],
    },
  ],
};

export default engagement;
