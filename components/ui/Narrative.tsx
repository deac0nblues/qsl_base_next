'use client';

import { colors, accentOpacity } from '@/lib/theme';

interface NarrativeProps {
  text: string;
  className?: string;
}

export default function Narrative({ text, className = '' }: NarrativeProps) {
  return (
    <div
      className={className}
      style={{
        borderLeft: `2px solid ${colors.accent}`,
        paddingLeft: 24,
        maxWidth: '65ch',
      }}
    >
      <span className="code-accent" style={{ display: 'block', marginBottom: 8 }}>
        [NARRATIVE]
      </span>
      <p
        className="body-text"
        style={{ color: colors.secondaryText }}
      >
        {text}
      </p>
    </div>
  );
}
