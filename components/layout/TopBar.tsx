'use client';

import { useState } from 'react';
import { colors, accentOpacity, fontFamily, fontSize, letterSpacing, fontWeight, zIndex, transition } from '@/lib/theme';

interface TopBarProps {
  title: string;
  subtitle?: string;
  currentSlide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
  onGoToSlide?: (index: number) => void;
}

export default function TopBar({
  title,
  subtitle,
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onGoToSlide,
}: TopBarProps) {
  const [hoveredBtn, setHoveredBtn] = useState<'prev' | 'next' | null>(null);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: zIndex.nav,
        borderBottom: `1px solid ${accentOpacity[20]}`,
        background: colors.background,
        height: 48,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left: Logo + Client info on one line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span
          style={{
            fontFamily: fontFamily.sans,
            fontSize: 13,
            fontWeight: fontWeight.semibold,
            letterSpacing: letterSpacing.tightMd,
            color: colors.foreground,
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Quicksilver Labs
        </span>
        {title && (
          <>
            <span
              style={{
                width: 1,
                height: 14,
                background: accentOpacity[25],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: fontSize.label,
                letterSpacing: letterSpacing.mono,
                color: colors.secondaryText,
                textTransform: 'uppercase' as const,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {title}
              {subtitle ? ` \u2014 ${subtitle}` : ''}
            </span>
          </>
        )}
      </div>

      {/* Center: Dot indicators */}
      {currentSlide !== undefined && totalSlides !== undefined && totalSlides > 0 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {Array.from({ length: totalSlides }, (_, i) => {
            const isActive = i === currentSlide;
            const isHovered = i === hoveredDot;
            return (
              <button
                key={i}
                onClick={() => onGoToSlide?.(i)}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
                aria-label={`Go to slide ${i + 1}`}
                className={isActive ? 'topbar-dot-active' : ''}
                style={{
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  borderRadius: 4,
                  height: 6,
                  width: isActive ? 20 : 6,
                  background: isActive
                    ? colors.accent
                    : isHovered
                      ? accentOpacity[50]
                      : accentOpacity[25],
                  transition: `all ${transition.fast} ease`,
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Right: Prev / Next arrows */}
      {currentSlide !== undefined && totalSlides !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <button
            onClick={onPrev}
            onMouseEnter={() => setHoveredBtn('prev')}
            onMouseLeave={() => setHoveredBtn(null)}
            disabled={currentSlide === 0}
            aria-label="Previous slide"
            style={{
              background: 'none',
              border: 'none',
              color: hoveredBtn === 'prev' && currentSlide !== 0
                ? colors.foreground
                : colors.secondaryText,
              fontSize: 18,
              lineHeight: 1,
              cursor: currentSlide === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: `color ${transition.fast}`,
              padding: '4px 6px',
              opacity: currentSlide === 0 ? 0.25 : hoveredBtn === 'prev' ? 1 : 0.6,
            }}
          >
            &#8249;
          </button>
          <span
            style={{
              fontFamily: fontFamily.mono,
              fontSize: fontSize.annotation,
              letterSpacing: letterSpacing.mono,
              color: colors.secondaryText,
              minWidth: 32,
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            {currentSlide + 1}/{totalSlides}
          </span>
          <button
            onClick={onNext}
            onMouseEnter={() => setHoveredBtn('next')}
            onMouseLeave={() => setHoveredBtn(null)}
            disabled={currentSlide === totalSlides - 1}
            aria-label="Next slide"
            style={{
              background: 'none',
              border: 'none',
              color: hoveredBtn === 'next' && currentSlide !== totalSlides - 1
                ? colors.foreground
                : colors.secondaryText,
              fontSize: 18,
              lineHeight: 1,
              cursor: currentSlide === totalSlides - 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: `color ${transition.fast}`,
              padding: '4px 6px',
              opacity: currentSlide === totalSlides - 1 ? 0.25 : hoveredBtn === 'next' ? 1 : 0.6,
            }}
          >
            &#8250;
          </button>
        </div>
      )}
    </nav>
  );
}
