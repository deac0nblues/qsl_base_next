'use client';

import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import type { KPIData } from '@/lib/types';
import useAnimatedCounter from '@/lib/hooks/useAnimatedCounter';

function formatValue(value: number, format: KPIData['format'], prefix?: string, suffix?: string): string {
  let formatted: string;
  switch (format) {
    case 'currency':
      formatted = value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      break;
    case 'percent':
      formatted = `${value.toFixed(1)}%`;
      break;
    default:
      formatted = value.toLocaleString('en-US');
  }
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`;
}

interface KPIProps {
  data: KPIData;
  animate?: boolean;
}

export default function KPI({ data, animate = true }: KPIProps) {
  const displayValue = useAnimatedCounter(data.value, animate ? 1200 : 0);
  const delta = data.previousValue !== undefined ? ((data.value - data.previousValue) / data.previousValue) * 100 : null;

  return (
    <div
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        padding: 24,
        flex: '1 1 0',
        minWidth: 160,
        transition: 'all 200ms',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = colors.accent;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${accentOpacity[25]}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accentOpacity[50];
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      <span className="code-accent" style={{ display: 'block', marginBottom: 8 }}>
        {data.label}
      </span>
      <span
        style={{
          fontSize: 36,
          fontWeight: 300,
          display: 'block',
          fontFamily: fontFamily.sans,
          lineHeight: 1.15,
        }}
      >
        {formatValue(displayValue, data.format, data.prefix, data.suffix)}
      </span>
      {delta !== null && (
        <span
          style={{
            fontSize: 12,
            marginTop: 8,
            display: 'inline-block',
            color: delta >= 0 ? colors.accent : '#ff6b6b',
            fontFamily: fontFamily.mono,
          }}
        >
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)}%
        </span>
      )}
    </div>
  );
}
