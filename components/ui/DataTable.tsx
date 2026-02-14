'use client';

import { colors, accentOpacity, fontFamily } from '@/lib/theme';

interface Column {
  key: string;
  label: string;
  format?: 'number' | 'currency' | 'percent' | 'string';
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  title?: string;
  /** When true, the table stretches to fill its parent flex container */
  fill?: boolean;
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

export default function DataTable({ columns, rows, title, fill }: DataTableProps) {
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
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: i < rows.length - 1 ? `1px solid ${accentOpacity[20]}` : undefined,
                  transition: 'background 200ms',
                  ...(fill ? { height: `${100 / rows.length}%` } : {}),
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(0,255,150,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: fill ? '16px 16px' : '10px 16px',
                      fontSize: 14,
                      color: colors.secondaryText,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {fmtCell(row[col.key], col.format)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
