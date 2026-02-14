'use client';

import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { colors, accentOpacity, fontFamily } from '@/lib/theme';

export default function PasswordGate() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(true);
        setInput('');
        // Re-trigger shake animation by removing and re-adding the class
        const form = formRef.current;
        if (form) {
          form.classList.remove('animate-shake');
          // Force reflow to restart animation
          void form.offsetWidth;
          form.classList.add('animate-shake');
        }
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
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
        ref={formRef}
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
          disabled={loading}
          style={{
            width: '100%',
            padding: '12px 24px',
            background: loading ? 'transparent' : colors.accent,
            color: loading ? colors.accent : colors.background,
            border: `2px solid ${colors.accent}`,
            fontFamily: fontFamily.mono,
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            cursor: loading ? 'wait' : 'pointer',
            minHeight: 48,
            fontWeight: 600,
            transition: 'all 200ms',
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = colors.accent;
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.background = colors.accent;
              (e.currentTarget as HTMLButtonElement).style.color = colors.background;
            }
          }}
        >
          {loading ? 'VERIFYING...' : 'UNLOCK'}
        </button>
      </form>
    </div>
  );
}
