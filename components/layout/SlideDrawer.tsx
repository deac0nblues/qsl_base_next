'use client';

import { ReactNode } from 'react';
import { colors, accentOpacity } from '@/lib/theme';

interface SlideDrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SlideDrawer({ open, onClose, children }: SlideDrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          background: 'rgba(0,0,0,0.6)',
          transition: 'opacity 200ms',
        }}
      />
      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          width: 320,
          maxWidth: '85vw',
          background: colors.background,
          borderLeft: `1px solid ${accentOpacity[50]}`,
          padding: 24,
          overflowY: 'auto',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-out',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close drawer"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            color: colors.accent,
            fontSize: 20,
            cursor: 'pointer',
            fontFamily: 'monospace',
          }}
        >
          ✕
        </button>
        <div style={{ marginTop: 40 }}>{children}</div>
      </div>
    </>
  );
}
