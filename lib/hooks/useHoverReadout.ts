'use client';

import { useState, useCallback } from 'react';

export interface HoverReadout {
  /** The contextual message to show in the readout bar */
  message: string;
  /** Optional numeric value to highlight */
  value?: number;
  /** Format for the optional value */
  format?: 'number' | 'currency' | 'percent';
}

/**
 * Hook for managing chart hover → readout state.
 * Returns the current readout (or null when idle) plus handlers
 * that chart components can call on mouseEnter / mouseLeave.
 */
export default function useHoverReadout() {
  const [readout, setReadout] = useState<HoverReadout | null>(null);

  const onHover = useCallback((data: HoverReadout) => {
    setReadout(data);
  }, []);

  const onHoverEnd = useCallback(() => {
    setReadout(null);
  }, []);

  return { readout, onHover, onHoverEnd } as const;
}
