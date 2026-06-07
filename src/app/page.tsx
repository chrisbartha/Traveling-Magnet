import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Traveling Magnet — A Memorial Journey',
};

export default function HomePage() {
  return (
    <main className="home">
      <div className="home__icon">🧭</div>
      <h1 className="home__title">Traveling Magnet</h1>
      <p className="home__subtitle">
        Memories that travel the world. Scan a magnet to begin the journey.
      </p>
      <Link href="/about" className="home__cta">
        Learn More →
      </Link>
    </main>
  );
}
