export const dynamic = 'force-dynamic';

export default function DebugPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Environment Variables Debug</h1>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: '8px', color: '#333' }}>
        {JSON.stringify({
          NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'UNDEFINED',
          NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? 'HIDDEN (BUT SET)' : 'UNDEFINED',
          NODE_ENV: process.env.NODE_ENV,
          VERCEL_ENV: process.env.VERCEL_ENV || 'UNDEFINED',
        }, null, 2)}
      </pre>
    </div>
  );
}
