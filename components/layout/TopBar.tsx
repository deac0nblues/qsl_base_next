'use client';

import { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <span style={{ fontWeight: 300, fontSize: 18 }}>{title}</span>
        {subtitle && (
          <span style={{ color: colors.secondaryText, marginLeft: 12, fontSize: 14 }}>{subtitle}</span>
        )}
      </div>

      {currentSlide !== undefined && totalSlides !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onPrev}
            aria-label="Previous slide"
            style={{
              background: 'none',
              border: `1px solid ${accentOpacity[40]}`,
              color: colors.accent,
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms',
              fontFamily: 'monospace',
            }}
          >
            ←
          </button>
          <span className="annotation">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={onNext}
            aria-label="Next slide"
            style={{
              background: 'none',
              border: `1px solid ${accentOpacity[40]}`,
              color: colors.accent,
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 200ms',
              fontFamily: 'monospace',
            }}
          >
            →
          </button>
        </div>
      )}
    </nav>
  );
}
