'use client';

import { useState, FormEvent, ReactNode } from 'react';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';

interface PasswordGateProps {
  password: string;
  children: ReactNode;
}

export default function PasswordGate({ password, children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input === password) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: colors.background,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          border: `1px solid ${accentOpacity[50]}`,
          borderRadius: 2,
          padding: 48,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <span className="code-accent" style={{ display: 'block', marginBottom: 24 }}>
          [AUTHENTICATION_REQUIRED]
        </span>
        <h2 style={{ fontWeight: 300, fontSize: 24, marginBottom: 32, lineHeight: 1.2 }}>
          Enter Password
        </h2>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="••••••••"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'transparent',
            border: `1px solid ${error ? '#ff6b6b' : accentOpacity[40]}`,
            color: colors.foreground,
            fontFamily: fontFamily.mono,
            fontSize: 14,
            marginBottom: 16,
            outline: 'none',
            transition: 'border-color 200ms',
          }}
          onFocus={(e) => {
            if (!error) e.currentTarget.style.borderColor = colors.accent;
          }}
          onBlur={(e) => {
            if (!error) e.currentTarget.style.borderColor = accentOpacity[40];
          }}
          autoFocus
        />
        {error && (
          <p style={{ color: '#ff6b6b', fontSize: 12, marginBottom: 12, fontFamily: fontFamily.mono }}>
            INVALID PASSWORD
          </p>
        )}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px 24px',
            background: colors.accent,
            color: colors.background,
            border: `2px solid ${colors.accent}`,
            fontFamily: fontFamily.mono,
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            minHeight: 48,
            fontWeight: 600,
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = colors.accent;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = colors.accent;
            (e.currentTarget as HTMLButtonElement).style.color = colors.background;
          }}
        >
          UNLOCK
        </button>
      </form>
    </div>
  );
}
