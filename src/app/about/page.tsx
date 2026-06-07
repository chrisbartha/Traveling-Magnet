import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Traveling Magnet',
  description: 'Learn about the Traveling Magnet memorial project.',
};

export default function AboutPage() {
  return (
    <main
      className="container"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 6vw, 3rem)',
          color: 'var(--color-gold)',
          marginBottom: '1.5rem',
        }}
      >
        About Traveling Magnet
      </h1>

      <hr className="section-divider" style={{ margin: '0 0 2rem' }} />

      <div
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1.05rem',
          lineHeight: '1.8',
          maxWidth: '540px',
        }}
      >
        <p style={{ marginBottom: '1.5rem' }}>
          <strong style={{ color: 'var(--color-gold)' }}>Traveling Magnet</strong>{' '}
          is a memorial project that keeps a loved one&apos;s memory alive through
          physical magnets that travel the world.
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Each magnet carries a QR code. When someone finds one — in a café, on a
          fridge, at a hostel — they scan it and are invited to check in, sharing
          where the magnet has traveled and leaving a message.
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          Every scan adds a new chapter to the journey. Over time, these small
          moments build a living map of connection, memory, and love that stretches
          across borders.
        </p>

        <p style={{ marginBottom: '2.5rem' }}>
          The magnets travel so their memory never stands still.
        </p>
      </div>

      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 2rem',
          border: '1px solid var(--color-gold-dim)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-gold)',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          transition: 'all 300ms ease',
        }}
      >
        ← Back Home
      </Link>
    </main>
  );
}
