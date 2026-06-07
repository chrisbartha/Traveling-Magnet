import type { Person } from '@/lib/types';

interface MemorialSectionProps {
  person: Person;
}

function formatDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function MemorialSection({ person }: MemorialSectionProps) {
  const birthFormatted = formatDate(person.birth_date);
  const passingFormatted = formatDate(person.passing_date);

  const datesDisplay =
    birthFormatted && passingFormatted
      ? `${birthFormatted} — ${passingFormatted}`
      : birthFormatted
        ? `Born ${birthFormatted}`
        : passingFormatted
          ? `Passed ${passingFormatted}`
          : null;

  return (
    <section id="memorial" className="memorial" aria-label="Memorial">
      <div className="container">
        <div className="memorial__photo-wrapper">
          {person.photo_url ? (
            <img
              src={person.photo_url}
              alt={`Photo of ${person.name}`}
              className="memorial__photo"
              loading="lazy"
            />
          ) : (
            <div
              className="memorial__photo-placeholder"
              aria-hidden="true"
            >
              ✦
            </div>
          )}
        </div>

        <h2 className="memorial__name">{person.name}</h2>

        {datesDisplay && (
          <p className="memorial__dates">{datesDisplay}</p>
        )}

        {person.bio && (
          <p className="memorial__bio">{person.bio}</p>
        )}

        {person.quote && (
          <blockquote className="memorial__quote">
            <span aria-hidden="true">&ldquo;</span>
            {person.quote}
          </blockquote>
        )}

        <div className="section-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
