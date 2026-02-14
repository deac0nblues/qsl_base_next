'use client';

import { useEffect, useState, useRef } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import type { HoverReadout } from '@/lib/hooks/useHoverReadout';

interface LiveReadoutProps {
  label: string;
  value: number;
  format?: 'number' | 'currency' | 'percent';
  /** Simulated refresh interval in ms (0 = no refresh) */
  refreshInterval?: number;
  /** When set, the readout shows contextual hover data instead of the default value */
  hoverData?: HoverReadout | null;
}

function formatValue(v: number, format: 'number' | 'currency' | 'percent'): string {
  switch (format) {
    case 'currency':
      return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    case 'percent':
      return `${v.toFixed(1)}%`;
    default:
      return v.toLocaleString('en-US');
  }
}

export default function LiveReadout({
  label,
  value,
  format = 'number',
  refreshInterval = 0,
  hoverData,
}: LiveReadoutProps) {
  const [current, setCurrent] = useState(value);
  const [flash, setFlash] = useState(false);
  const prevHover = useRef<HoverReadout | null>(null);

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

  // Flash on hover data change
  useEffect(() => {
    if (hoverData && hoverData !== prevHover.current) {
      setFlash(true);
      setTimeout(() => setFlash(false), 400);
    }
    prevHover.current = hoverData ?? null;
  }, [hoverData]);

  const isHovering = !!hoverData;

  // Determine what to display
  const displayLabel = isHovering ? hoverData.message : label;
  const displayValue = isHovering && hoverData.value != null
    ? formatValue(hoverData.value, hoverData.format ?? format)
    : isHovering
      ? null
      : formatValue(current, format);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 8,
        padding: '8px 16px',
        border: `1px solid ${flash ? colors.accent : isHovering ? accentOpacity[80] : accentOpacity[40]}`,
        borderRadius: 2,
        transition: 'border-color 400ms, background 300ms',
        background: isHovering ? accentOpacity[5] : 'transparent',
        minWidth: isHovering ? 220 : undefined,
      }}
    >
      <span
        className="annotation"
        style={{
          transition: 'color 300ms',
          color: isHovering ? colors.foreground : undefined,
          whiteSpace: 'nowrap',
        }}
      >
        {displayLabel}
      </span>
      {displayValue && (
        <span
          style={{
            fontFamily: fontFamily.mono,
            fontSize: 20,
            fontWeight: 600,
            color: colors.accent,
          }}
        >
          {displayValue}
        </span>
      )}
      {!isHovering && refreshInterval > 0 && (
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
      {isHovering && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: colors.accent,
            display: 'inline-block',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      )}
    </div>
  );
}
