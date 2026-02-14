'use client';

import { useState } from 'react';
import { colors, accentOpacity } from '@/lib/theme';

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
        borderBottom: `1px solid ${accentOpacity[20]}`,
        background: colors.background,
        transition: 'all 200ms',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <span style={{ display: 'block', marginBottom: 2, color: '#FFFFFF', lineHeight: 1.2 }}>
          Quicksilver<br />Labs
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
