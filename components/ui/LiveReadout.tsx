'use client';

import { useEffect, useState } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';

interface LiveReadoutProps {
  label: string;
  value: number;
  format?: 'number' | 'currency' | 'percent';
  /** Simulated refresh interval in ms (0 = no refresh) */
  refreshInterval?: number;
}

export default function LiveReadout({ label, value, format = 'number', refreshInterval = 0 }: LiveReadoutProps) {
  const [current, setCurrent] = useState(value);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  useEffect(() => {
    if (!refreshInterval) return;
    const timer = setInterval(() => {
      // Simulate small fluctuation
      setCurrent((v) => {
        const delta = v * (Math.random() * 0.02 - 0.01);
        return Math.round((v + delta) * 100) / 100;
      });
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }, refreshInterval);
    return () => clearInterval(timer);
  }, [refreshInterval]);

  let formatted: string;
  switch (format) {
    case 'currency':
      formatted = current.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      break;
    case 'percent':
      formatted = `${current.toFixed(1)}%`;
      break;
    default:
      formatted = current.toLocaleString('en-US');
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        padding: '8px 16px',
        border: `1px solid ${flash ? colors.accent : accentOpacity[40]}`,
        borderRadius: 2,
        transition: 'border-color 400ms',
      }}
    >
      <span className="annotation">{label}</span>
      <span
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 20,
          fontWeight: 600,
          color: colors.accent,
        }}
      >
        {formatted}
      </span>
      {refreshInterval > 0 && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: flash ? colors.accent : accentOpacity[40],
            display: 'inline-block',
            transition: 'background 400ms',
          }}
        />
      )}
    </div>
  );
}
