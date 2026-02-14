'use client';

import { ReactNode } from 'react';
import { colors, spacing } from '@/lib/theme';

interface PageWrapProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrap({ children, className = '' }: PageWrapProps) {
  return (
    <main
      className={className}
      style={{
        maxWidth: spacing.maxContentWidth,
        margin: '0 auto',
        padding: '0 16px',
        height: 'calc(100vh - 48px)',
        display: 'flex',
        flexDirection: 'column',
        background: colors.background,
      }}
    >
      {children}
    </main>
  );
}
