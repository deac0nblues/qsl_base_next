import type { KPIData, FunnelStage, RepData } from '@/lib/types';

export const sampleKPIs: KPIData[] = [
  { label: 'Revenue', value: 2450000, previousValue: 2100000, format: 'currency' },
  { label: 'Deals Closed', value: 142, previousValue: 118, format: 'number' },
  { label: 'Win Rate', value: 34.2, previousValue: 29.8, format: 'percent', suffix: '%' },
  { label: 'Avg Deal Size', value: 17250, previousValue: 17800, format: 'currency' },
];

export const sampleFunnel: FunnelStage[] = [
  { label: 'Leads', value: 12500 },
  { label: 'MQLs', value: 4800 },
  { label: 'SQLs', value: 1920 },
  { label: 'Opportunities', value: 640 },
  { label: 'Closed Won', value: 142 },
];

export const sampleReps: RepData[] = [
  { name: 'Sarah Chen', value: 520000, target: 500000 },
  { name: 'Marcus Johnson', value: 480000, target: 500000 },
  { name: 'Priya Patel', value: 445000, target: 450000 },
  { name: 'David Kim', value: 410000, target: 450000 },
  { name: 'Emma Wilson', value: 350000, target: 400000 },
];

export const sampleMonthlyRevenue = [
  { month: 'Jul', revenue: 380000 },
  { month: 'Aug', revenue: 420000 },
  { month: 'Sep', revenue: 510000 },
  { month: 'Oct', revenue: 580000 },
  { month: 'Nov', revenue: 720000 },
  { month: 'Dec', revenue: 840000 },
];

export const sampleSparkline = [12, 18, 15, 22, 28, 24, 32, 38, 35, 42, 48, 52];

export const sampleComparison = [
  { label: 'Pipeline Generated', current: 8200000, previous: 6800000, format: 'currency' as const },
  { label: 'Pipeline Velocity', current: 45, previous: 38, format: 'number' as const },
  { label: 'Average Sales Cycle', current: 32, previous: 36, format: 'number' as const },
  { label: 'Customer Retention', current: 94.2, previous: 91.8, format: 'percent' as const },
];

export const sampleTableColumns = [
  { key: 'name', label: 'Rep', format: 'string' as const },
  { key: 'deals', label: 'Deals', format: 'number' as const },
  { key: 'revenue', label: 'Revenue', format: 'currency' as const },
  { key: 'winRate', label: 'Win Rate', format: 'percent' as const },
];

export const sampleTableRows = [
  { name: 'Sarah Chen', deals: 28, revenue: 520000, winRate: 42.1 },
  { name: 'Marcus Johnson', deals: 24, revenue: 480000, winRate: 38.5 },
  { name: 'Priya Patel', deals: 31, revenue: 445000, winRate: 36.2 },
  { name: 'David Kim', deals: 22, revenue: 410000, winRate: 33.0 },
  { name: 'Emma Wilson', deals: 19, revenue: 350000, winRate: 28.4 },
  { name: 'James Liu', deals: 18, revenue: 245000, winRate: 25.7 },
];
