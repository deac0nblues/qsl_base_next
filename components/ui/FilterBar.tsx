'use client';

import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import type { FilterOption } from '@/lib/types';

interface FilterBarProps {
  filters: FilterOption[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function FilterBar({ filters, values, onChange }: FilterBarProps) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
      {filters.map((f) => (
        <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label
            className="annotation"
            htmlFor={`filter-${f.key}`}
          >
            {f.label}
          </label>
          <select
            id={`filter-${f.key}`}
            value={values[f.key] ?? f.defaultValue ?? f.options[0]}
            onChange={(e) => onChange(f.key, e.target.value)}
            style={{
              background: colors.background,
              color: colors.accent,
              border: `1px solid ${accentOpacity[40]}`,
              padding: '6px 12px',
              fontFamily: fontFamily.mono,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              minHeight: 36,
            }}
          >
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
