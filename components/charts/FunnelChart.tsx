'use client';

import { ReactNode, useState } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';
import useIntersectionReveal from '@/lib/hooks/useIntersectionReveal';
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
  const { ref, revealed } = useIntersectionReveal({ threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      ref={ref}
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
          const dropoff = i > 0 ? (100 - (stage.value / stages[i - 1].value) * 100) : null;
          const dropoffCount = i > 0 ? stages[i - 1].value - stage.value : null;

          // Show the drop-off badge between stages when hovering the current stage
          // or the previous stage (i.e. the gap between i-1 and i)
          const showDropoff = i > 0 && (hoveredIndex === i || hoveredIndex === i - 1);

          return (
            <div key={stage.label}>
              {/* Drop-off indicator between stages */}
              {i > 0 && (
                <div
                  style={{
                    height: showDropoff ? 'auto' : 0,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: showDropoff ? 6 : 0,
                    transition: 'margin-bottom 200ms ease-out',
                  }}
                >
                  {showDropoff && (
                    <span
                      style={{
                        fontFamily: fontFamily.mono,
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#ff6b6b',
                        background: 'rgba(255, 107, 107, 0.08)',
                        border: '1px solid rgba(255, 107, 107, 0.2)',
                        borderRadius: 2,
                        padding: '2px 8px',
                        animation: 'dropoffFadeIn 200ms ease-out both',
                      }}
                    >
                      &#x25BC; {dropoff!.toFixed(1)}% drop-off &middot; {dropoffCount!.toLocaleString()} lost
                    </span>
                  )}
                </div>
              )}

              <div
                style={{ cursor: onStageHover ? 'pointer' : undefined }}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  onStageHover?.(stage, i, convRate);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  onStageHoverEnd?.();
                }}
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
                <div
                  style={{
                    height: 28,
                    background: accentOpacity[5],
                    borderRadius: 2,
                    position: 'relative',
                    transformOrigin: 'bottom center',
                    animation: revealed
                      ? `funnelBarRise 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms both`
                      : 'none',
                    opacity: revealed ? undefined : 0,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: revealed ? `${pct}%` : '0%',
                      background: stage.color ?? `rgba(0, 255, 150, ${0.3 + 0.7 * (1 - i / stages.length)})`,
                      borderRadius: 2,
                      transition: `width 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
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
