'use client';

import { useEffect, useCallback } from 'react';

interface UseKeyboardNavOptions {
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
}

/**
 * Arrow-key and space/enter navigation for slide decks.
 */
export default function useKeyboardNav({ onNext, onPrev, enabled = true }: UseKeyboardNavOptions) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      // Ignore when typing in inputs
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          onPrev();
          break;
      }
    },
    [onNext, onPrev, enabled],
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
