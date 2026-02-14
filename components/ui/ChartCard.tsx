'use client';

import { ReactNode } from 'react';
import { colors, accentOpacity } from '@/lib/theme';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  /** Optional readout bar rendered below the chart area */
  footer?: ReactNode;
  /** When true, the card stretches to fill its parent flex container */
  fill?: boolean;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, footer, fill, className = '' }: ChartCardProps) {
  return (
    <div
      className={className}
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        padding: 24,
        background: colors.background,
        transition: 'all 200ms',
        ...(fill ? { flex: 1, display: 'flex', flexDirection: 'column' as const, minHeight: 0 } : {}),
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
      <div style={{ marginBottom: 16, flexShrink: 0 }}>
        <span className="code-accent" style={{ display: 'block', marginBottom: 4 }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 14, color: colors.secondaryText }}>{subtitle}</span>
        )}
      </div>
      <div style={{ width: '100%', ...(fill ? { flex: 1, minHeight: 0 } : { height: 280 }) }}>{children}</div>
      {footer && (
        <div style={{ marginTop: 16, flexShrink: 0 }}>{footer}</div>
      )}
    </div>
  );
}
