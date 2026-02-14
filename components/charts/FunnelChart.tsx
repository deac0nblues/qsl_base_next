'use client';

import { ReactNode } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import type { FunnelStage } from '@/lib/types';

interface FunnelChartProps {
  stages: FunnelStage[];
  title?: string;
  /** Called when a funnel stage is hovered */
  onStageHover?: (stage: FunnelStage, index: number, conversionRate: number | null) => void;
  /** Called when hover leaves all stages */
  onStageHoverEnd?: () => void;
  /** Optional readout bar rendered below the funnel */
  footer?: ReactNode;
  /** When true, the card stretches to fill its parent flex container */
  fill?: boolean;
}

export default function FunnelChart({ stages, title, onStageHover, onStageHoverEnd, footer, fill }: FunnelChartProps) {
  const maxValue = Math.max(...stages.map((s) => s.value));

  return (
    <div
      style={{
        border: `1px solid ${accentOpacity[50]}`,
        borderRadius: 2,
        padding: 24,
        ...(fill ? { flex: 1, display: 'flex', flexDirection: 'column' as const, minHeight: 0 } : {}),
      }}
    >
      {title && (
        <span className="code-accent" style={{ display: 'block', marginBottom: 20, flexShrink: 0 }}>
          {title}
        </span>
      )}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        ...(fill ? { flex: 1, justifyContent: 'space-evenly' as const, minHeight: 0 } : { gap: 12 }),
      }}>
        {stages.map((stage, i) => {
          const pct = (stage.value / maxValue) * 100;
          const convRate = i > 0 ? ((stage.value / stages[i - 1].value) * 100) : null;
          const convRateStr = convRate !== null ? convRate.toFixed(1) : null;
          return (
            <div
              key={stage.label}
              style={{ cursor: onStageHover ? 'pointer' : undefined }}
              onMouseEnter={() => onStageHover?.(stage, i, convRate)}
              onMouseLeave={() => onStageHoverEnd?.()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: colors.secondaryText }}>{stage.label}</span>
                <span style={{ fontFamily: fontFamily.mono, fontSize: 13 }}>
                  {stage.value.toLocaleString()}
                  {convRateStr && (
                    <span style={{ color: colors.accent, marginLeft: 8, fontSize: 11 }}>
                      {convRateStr}%
                    </span>
                  )}
                </span>
              </div>
              <div style={{ height: 28, background: accentOpacity[5], borderRadius: 2, position: 'relative' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: stage.color ?? `rgba(0, 255, 150, ${0.3 + 0.7 * (1 - i / stages.length)})`,
                    borderRadius: 2,
                    transition: 'width 600ms ease-out',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 8,
                  }}
                >
                  {pct > 20 && (
                    <span style={{ fontFamily: fontFamily.mono, fontSize: 10, color: colors.background }}>
                      {pct.toFixed(0)}%
                    </span>
                  )}
                </div>
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
