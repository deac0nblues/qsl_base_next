'use client';

import { useState } from 'react';
import { colors } from '@/lib/theme';

interface TopBarProps {
  title: string;
  subtitle?: string;
  currentSlide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export default function TopBar({ title, subtitle, currentSlide, totalSlides, onPrev, onNext }: TopBarProps) {
  const [hoveredBtn, setHoveredBtn] = useState<'prev' | 'next' | null>(null);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: colors.background,
        height: 48,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo + divider + client info — single row, vertically centered */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <span
          className="code-accent"
          style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.5, whiteSpace: 'nowrap' }}
        >
          Quicksilver Labs
        </span>
        <span
          style={{
            display: 'inline-block',
            width: 1,
            height: 18,
            background: 'rgba(255,255,255,0.12)',
            margin: '0 14px',
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: 300, fontSize: 14, color: colors.secondaryText, whiteSpace: 'nowrap' }}>
          {title}
          {subtitle && (
            <span style={{ marginLeft: 8, fontSize: 13, opacity: 0.7 }}>{subtitle}</span>
          )}
        </span>
      </div>

      {/* Slide navigation */}
      {currentSlide !== undefined && totalSlides !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={onPrev}
            onMouseEnter={() => setHoveredBtn('prev')}
            onMouseLeave={() => setHoveredBtn(null)}
            aria-label="Previous slide"
            style={{
              background: 'none',
              border: 'none',
              color: hoveredBtn === 'prev' ? colors.foreground : colors.secondaryText,
              fontSize: 16,
              width: 28,
              height: 28,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 150ms',
              fontFamily: 'monospace',
              padding: 0,
              opacity: hoveredBtn === 'prev' ? 1 : 0.6,
            }}
          >
            ‹
          </button>
          <span className="annotation" style={{ fontSize: 12, minWidth: 32, textAlign: 'center' }}>
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={onNext}
            onMouseEnter={() => setHoveredBtn('next')}
            onMouseLeave={() => setHoveredBtn(null)}
            aria-label="Next slide"
            style={{
              background: 'none',
              border: 'none',
              color: hoveredBtn === 'next' ? colors.foreground : colors.secondaryText,
              fontSize: 16,
              width: 28,
              height: 28,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 150ms',
              fontFamily: 'monospace',
              padding: 0,
              opacity: hoveredBtn === 'next' ? 1 : 0.6,
            }}
          >
            ›
          </button>
        </div>
      )}
    </nav>
  );
}
