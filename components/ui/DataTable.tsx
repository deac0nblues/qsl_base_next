'use client';

import { useState, ReactNode } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import Sparkline from '@/components/ui/Sparkline';

interface Column {
  key: string;
  label: string;
  format?: 'number' | 'currency' | 'percent' | 'string';
}

interface DetailMetrics {
  avgDealSize?: number;
  pipeline?: number;
  quota?: number;
  calls?: number;
  meetings?: number;
  proposals?: number;
  [key: string]: unknown;
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  title?: string;
  /** When true, the table stretches to fill its parent flex container */
  fill?: boolean;
  /** Key in row data that holds a number[] for sparklines */
  trendKey?: string;
  /** Key in row data that holds an object with extra detail metrics */
  detailKey?: string;
  /** Optional readout bar rendered below the table */
  footer?: ReactNode;
}

function fmtCell(value: unknown, format?: Column['format']): string {
  if (value == null) return '—';
  const n = Number(value);
  switch (format) {
    case 'currency':
      return isNaN(n) ? String(value) : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    case 'percent':
      return isNaN(n) ? String(value) : `${n.toFixed(1)}%`;
    case 'number':
      return isNaN(n) ? String(value) : n.toLocaleString('en-US');
    default:
      return String(value);
  }
}

function DetailPanel({ detail, quota }: { detail: DetailMetrics; quota?: number }) {
  const metrics = [
    { label: 'Avg Deal Size', value: detail.avgDealSize, format: 'currency' as const },
    { label: 'Pipeline', value: detail.pipeline, format: 'currency' as const },
    { label: 'Calls', value: detail.calls, format: 'number' as const },
    { label: 'Meetings', value: detail.meetings, format: 'number' as const },
    { label: 'Proposals', value: detail.proposals, format: 'number' as const },
  ];

  const quotaAttainment = quota && detail.pipeline
    ? ((Number(detail.pipeline) / quota) * 100).toFixed(1)
    : null;

  return (
    <div
      style={{
        overflow: 'hidden',
        animation: 'detailExpand 300ms ease-out both',
        background: accentOpacity[5],
        borderTop: `1px solid ${accentOpacity[20]}`,
      }}
    >
      <div
        style={{
          padding: '16px 16px 16px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {metrics.map((m) => (
          m.value != null && (
            <div key={m.label} style={{ minWidth: 100 }}>
              <span
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: colors.accent,
                  display: 'block',
                  marginBottom: 2,
                }}
              >
                {m.label}
              </span>
              <span
                style={{
                  fontFamily: fontFamily.mono,
                  fontSize: 14,
                  color: colors.foreground,
                }}
              >
                {fmtCell(m.value, m.format)}
              </span>
            </div>
          )
        ))}
        {quotaAttainment && (
          <div style={{ minWidth: 100 }}>
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: colors.accent,
                display: 'block',
                marginBottom: 2,
              }}
            >
              Pipeline / Quota
            </span>
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: 14,
                color: Number(quotaAttainment) >= 100 ? colors.accent : '#ff6b6b',
              }}
            >
              {quotaAttainment}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DataTable({ columns, rows, title, fill, trendKey, detailKey, footer }: DataTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const showTrend = Boolean(trendKey);
  return (
    <div
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        overflow: 'hidden',
        ...(fill ? { flex: 1, display: 'flex', flexDirection: 'column' as const, minHeight: 0 } : {}),
      }}
    >
      {title && (
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${accentOpacity[20]}`, flexShrink: 0 }}>
          <span className="code-accent">{title}</span>
        </div>
      )}
      <div style={{ overflowX: 'auto', ...(fill ? { flex: 1, display: 'flex', flexDirection: 'column' as const } : {}) }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', ...(fill ? { flex: 1 } : {}) }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontFamily: fontFamily.mono,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: colors.accent,
                    borderBottom: `1px solid ${accentOpacity[20]}`,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {col.label}
                </th>
              ))}
              {showTrend && (
                <th
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    fontFamily: fontFamily.mono,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: colors.accent,
                    borderBottom: `1px solid ${accentOpacity[20]}`,
                    fontWeight: 400,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Trend
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isExpanded = expandedRow === i;
              const hasDetail = Boolean(detailKey && row[detailKey]);
              const trendData = trendKey ? (row[trendKey] as number[] | undefined) : undefined;

              return (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < rows.length - 1 ? `1px solid ${accentOpacity[20]}` : undefined,
                    transition: 'background 200ms',
                    cursor: hasDetail ? 'pointer' : undefined,
                    ...(fill ? { height: `${100 / rows.length}%` } : {}),
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLTableRowElement).style.background = accentOpacity[5];
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                    }
                  }}
                  onClick={() => {
                    if (hasDetail) {
                      setExpandedRow(isExpanded ? null : i);
                    }
                  }}
                >
                  {columns.map((col, ci) => (
                    <td
                      key={col.key}
                      style={{
                        padding: fill ? '16px 16px' : '10px 16px',
                        fontSize: 14,
                        fontFamily: ci === 0 ? fontFamily.sans : fontFamily.mono,
                        color: isExpanded ? colors.foreground : colors.secondaryText,
                        whiteSpace: 'nowrap',
                        transition: 'color 200ms',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {ci === 0 && hasDetail && (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 16,
                              fontFamily: fontFamily.mono,
                              fontSize: 10,
                              color: colors.accent,
                              transition: 'transform 200ms ease-out',
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                              flexShrink: 0,
                            }}
                          >
                            &#x25B6;
                          </span>
                        )}
                        {fmtCell(row[col.key], col.format)}
                      </span>
                    </td>
                  ))}
                  {showTrend && (
                    <td style={{ padding: '6px 16px' }}>
                      {trendData && trendData.length > 0 ? (
                        <Sparkline data={trendData} width={100} height={24} />
                      ) : (
                        <span style={{ color: colors.secondaryText, fontSize: 12 }}>—</span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Expanded detail panel renders outside the table for proper layout */}
        {expandedRow !== null && detailKey && Boolean(rows[expandedRow]?.[detailKey]) && (
          <DetailPanel
            detail={rows[expandedRow][detailKey] as DetailMetrics}
            quota={rows[expandedRow]['detail'] ? (rows[expandedRow]['detail'] as DetailMetrics).quota : undefined}
          />
        )}
      </div>
      {footer && (
        <div style={{ borderTop: `1px solid ${accentOpacity[20]}`, padding: '12px 16px' }}>{footer}</div>
      )}
    </div>
  );
}
