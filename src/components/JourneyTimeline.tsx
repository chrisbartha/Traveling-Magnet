import type { CheckIn } from '@/lib/types';

interface JourneyTimelineProps {
  checkins: CheckIn[];
}

function formatCheckInDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatLocation(checkin: CheckIn): string {
  if (checkin.city && checkin.country) {
    return `${checkin.city}, ${checkin.country}`;
  }
  return checkin.city || checkin.country || 'Unknown location';
}

export default function JourneyTimeline({ checkins }: JourneyTimelineProps) {
  return (
    <section id="journey" className="journey" aria-label="Journey timeline">
      <div className="container">
        <div className="journey__header">
          <h2 className="journey__title">The Journey</h2>
          <p className="journey__subtitle">
            Every stop tells a story. Every finder keeps the memory alive.
          </p>
        </div>

        {checkins.length === 0 ? (
          <div className="timeline__empty">
            <span className="timeline__empty-icon" aria-hidden="true">
              🧭
            </span>
            <p className="timeline__empty-text">
              No stops yet
            </p>
            <p className="timeline__empty-subtext">
              You could be the first stop on this magnet&apos;s journey.
            </p>
          </div>
        ) : (
          <div className="timeline" role="list">
            {checkins.map((checkin) => (
              <div
                key={checkin.id}
                className="timeline__item"
                role="listitem"
              >
                <div className="timeline__location">
                  <span className="timeline__location-icon" aria-hidden="true">
                    📍
                  </span>
                  {formatLocation(checkin)}
                </div>

                <div className="timeline__meta">
                  <time dateTime={checkin.created_at}>
                    {formatCheckInDate(checkin.created_at)}
                  </time>
                  {checkin.finder_name && (
                    <span className="timeline__finder">
                      Found by {checkin.finder_name}
                    </span>
                  )}
                </div>

                {checkin.message && (
                  <p className="timeline__message">
                    <em>&ldquo;{checkin.message}&rdquo;</em>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="section-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
