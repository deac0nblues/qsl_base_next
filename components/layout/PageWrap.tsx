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
        minHeight: '100vh',
        background: colors.background,
      }}
    >
      {children}
    </main>
  );
}
