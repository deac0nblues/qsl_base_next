/** Core data types for QSL engagement presentations */

export interface Engagement {
  id: string;
  client: string;
  title: string;
  date: string;
  password?: string;
  slides: SlideConfig[];
}

export interface SlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  layout: 'kpi-row' | 'chart' | 'funnel' | 'comparison' | 'table' | 'narrative' | 'custom';
  kpis?: KPIData[];
  narrative?: string;
  chartType?: 'bar' | 'line' | 'area' | 'funnel' | 'sparkline';
  chartData?: Record<string, unknown>[];
  tableData?: Record<string, unknown>[];
  tableColumns?: { key: string; label: string; format?: 'number' | 'currency' | 'percent' | 'string' }[];
  funnelStages?: FunnelStage[];
  repData?: RepData[];
  comparisonItems?: { label: string; current: number; previous: number; format?: 'number' | 'currency' | 'percent' }[];
  filters?: FilterOption[];
}

export interface KPIData {
  label: string;
  value: number;
  previousValue?: number;
  format: 'number' | 'currency' | 'percent';
  prefix?: string;
  suffix?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface RepData {
  name: string;
  value: number;
  target: number;
  unit?: string;
}

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FilterOption {
  key: string;
  label: string;
  options: string[];
  defaultValue?: string;
}
