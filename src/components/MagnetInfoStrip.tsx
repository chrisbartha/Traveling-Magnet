import type { CheckIn, Magnet } from '@/lib/types';

interface MagnetInfoStripProps {
  magnet: Magnet;
  checkins: CheckIn[];
}

export default function MagnetInfoStrip({ magnet, checkins }: MagnetInfoStripProps) {
  const uniqueCountries = new Set(
    checkins.map((c) => c.country).filter(Boolean)
  ).size;

  const daysTraveling = Math.floor(
    (Date.now() - new Date(magnet.created_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const firstScanned = checkins.length > 0
    ? new Date(checkins[checkins.length - 1].created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  return (
    <div className="magnet-info">
      <div className="container">
        <div className="magnet-info__grid">
          <div className="magnet-info__item">
            <span className="magnet-info__label">Magnet ID</span>
            <span className="magnet-info__value magnet-info__value--gold">
              #{String(magnet.number).padStart(3, '0')}
            </span>
          </div>
          <div className="magnet-info__item">
            <span className="magnet-info__label">First Scanned</span>
            <span className="magnet-info__value">{firstScanned}</span>
          </div>
          <div className="magnet-info__item">
            <span className="magnet-info__label">Total Scans</span>
            <span className="magnet-info__value">{checkins.length}</span>
          </div>
          <div className="magnet-info__item">
            <span className="magnet-info__label">Countries</span>
            <span className="magnet-info__value">{uniqueCountries}</span>
          </div>
          <div className="magnet-info__item">
            <span className="magnet-info__label">Days Traveling</span>
            <span className="magnet-info__value">{daysTraveling}</span>
          </div>
          <div className="magnet-info__item">
            <span className="magnet-info__label">Status</span>
            <span className="magnet-info__value magnet-info__value--active">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
