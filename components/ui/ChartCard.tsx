'use client';

import { ReactNode } from 'react';
import { colors, accentOpacity } from '@/lib/theme';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={className}
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        padding: 24,
        background: colors.background,
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
      <div style={{ marginBottom: 16 }}>
        <span className="code-accent" style={{ display: 'block', marginBottom: 4 }}>
          {title}
        </span>
        {subtitle && (
          <span style={{ fontSize: 14, color: colors.secondaryText }}>{subtitle}</span>
        )}
      </div>
      <div style={{ width: '100%', height: 280 }}>{children}</div>
    </div>
  );
}
