'use client';

import { ReactNode } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';

interface ComparisonItem {
  label: string;
  current: number;
  previous: number;
  format?: 'number' | 'currency' | 'percent';
}

interface ComparisonCardProps {
  items: ComparisonItem[];
  title?: string;
  /** Called when a comparison row is hovered */
  onItemHover?: (item: ComparisonItem, delta: number) => void;
  /** Called when hover leaves all rows */
  onItemHoverEnd?: () => void;
  /** Optional readout bar rendered below the comparison bars */
  footer?: ReactNode;
  /** When true, the card stretches to fill its parent flex container */
  fill?: boolean;
}

function fmt(v: number, format: ComparisonItem['format']): string {
  switch (format) {
    case 'currency':
      return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    case 'percent':
      return `${v.toFixed(1)}%`;
    default:
      return v.toLocaleString('en-US');
  }
}

export default function ComparisonCard({ items, title, onItemHover, onItemHoverEnd, footer, fill }: ComparisonCardProps) {
  return (
    <div
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        padding: 24,
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
      {title && (
        <span className="code-accent" style={{ display: 'block', marginBottom: 16, flexShrink: 0 }}>
          {title}
        </span>
      )}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        ...(fill ? { flex: 1, justifyContent: 'space-evenly' as const, minHeight: 0 } : { gap: 16 }),
      }}>
        {items.map((item) => {
          const delta = ((item.current - item.previous) / item.previous) * 100;
          const barPct = Math.min((item.current / Math.max(item.current, item.previous)) * 100, 100);
          return (
            <div
              key={item.label}
              style={{ cursor: onItemHover ? 'pointer' : undefined }}
              onMouseEnter={() => onItemHover?.(item, delta)}
              onMouseLeave={() => onItemHoverEnd?.()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: colors.secondaryText }}>{item.label}</span>
                <span style={{ fontFamily: fontFamily.mono, fontSize: 13 }}>
                  {fmt(item.current, item.format)}
                  <span style={{ color: delta >= 0 ? colors.accent : '#ff6b6b', marginLeft: 8, fontSize: 11 }}>
                    {delta >= 0 ? '+' : ''}
                    {delta.toFixed(1)}%
                  </span>
                </span>
              </div>
              <div style={{ height: 4, background: accentOpacity[20], borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${barPct}%`,
                    background: colors.accent,
                    borderRadius: 2,
                    transition: 'width 600ms ease-out',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {footer && (
        <div style={{ marginTop: 16, flexShrink: 0 }}>{footer}</div>
      )}
    </div>
  );
}
