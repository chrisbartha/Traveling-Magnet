import type { CheckIn, Magnet } from '@/lib/types';

interface StatsSectionProps {
  checkins: CheckIn[];
  magnet: Magnet;
}

export default function StatsSection({ checkins, magnet }: StatsSectionProps) {
  const timesFound = checkins.length;

  const countries = new Set(
    checkins
      .map((c) => c.country)
      .filter((c): c is string => c !== null && c !== '')
  ).size;

  const daysTraveling = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(magnet.created_at).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return (
    <>
      <section className="stats" aria-label="Journey statistics">
        <div className="stats__grid">
          <div className="stats__item">
            <span className="stats__icon" aria-hidden="true">📍</span>
            <span className="stats__value">{timesFound}</span>
            <span className="stats__label">Times Found</span>
          </div>

          <div className="stats__item">
            <span className="stats__icon" aria-hidden="true">🌍</span>
            <span className="stats__value">{countries}</span>
            <span className="stats__label">Countries</span>
          </div>

          <div className="stats__item">
            <span className="stats__icon" aria-hidden="true">📅</span>
            <span className="stats__value">{daysTraveling}</span>
            <span className="stats__label">Days Traveling</span>
          </div>

          <div className="stats__item">
            <span className="stats__icon" aria-hidden="true">✈️</span>
            <span className="stats__value">N/A</span>
            <span className="stats__label">Distance</span>
          </div>
        </div>
      </section>
      <hr className="section-divider" />
    </>
  );
}
