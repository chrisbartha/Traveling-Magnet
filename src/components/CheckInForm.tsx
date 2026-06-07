'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { CheckInInsert } from '@/lib/types';

interface CheckInFormProps {
  magnetId: number;
}

type FormStatus = 'idle' | 'locating' | 'located' | 'submitting' | 'success' | 'error';

export default function CheckInForm({ magnetId }: CheckInFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [finderName, setFinderName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [leaveLocation, setLeaveLocation] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser.');
      setStatus('error');
      return;
    }

    setStatus('locating');
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        setLatitude(lat);
        setLongitude(lng);
        setStatus('located');

        // Reverse geocode to get city name
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=en`,
            { headers: { 'User-Agent': 'TravelingMagnet/1.0' } }
          );
          const data = await res.json();
          const address = data.address;

          if (address) {
            const cityName =
              address.city ||
              address.town ||
              address.village ||
              address.municipality ||
              address.county ||
              '';
            const countryName = address.country || '';
            setCity(cityName);
            setCountry(countryName);
          }
        } catch {
          // Geocoding failed silently — user can still type manually
        }
      },
      (err) => {
        setErrorMessage(
          err.code === 1
            ? 'Location permission denied. You can type your location instead.'
            : 'Could not get your location. You can type it instead.'
        );
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const supabase = createClient();

    const fullMessage = [message.trim(), leaveLocation.trim() ? 'Leaving at: ' + leaveLocation.trim() : ''].filter(Boolean).join(' | ');

    const checkin: CheckInInsert = {
      magnet_id: magnetId,
      finder_name: finderName.trim() || undefined,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
      latitude: latitude ?? undefined,
      longitude: longitude ?? undefined,
      message: fullMessage || undefined,
    };

    const { error } = await supabase.from('checkins').insert(checkin);

    if (error) {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section id="checkin" className="checkin" aria-label="Check-in success">
        <div className="container">
          <div className="checkin__success">
            <div className="checkin__success-icon" aria-hidden="true">✓</div>
            <h2 className="checkin__success-title">Thank you!</h2>
            <p className="checkin__success-text">
              Your stop has been added to the journey. Now pass this magnet
              along and help keep the memory alive.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const locationDisplay =
    city && country ? `${city}, ${country}` : city || country || '';

  return (
    <section id="checkin" className="checkin" aria-label="Check in">
      <div className="container">
        <div className="checkin__header">
          <h2 className="checkin__title">Share Your Journey</h2>
          <p className="checkin__subtitle">
            Where did you find me? Where will you leave me next? Your story keeps the journey alive.
          </p>
        </div>

        <form className="checkin__form" onSubmit={handleSubmit}>
          <div className="checkin__field">
            <label className="checkin__label" htmlFor="finder-name">
              Your Name <span className="checkin__label-optional">(optional)</span>
            </label>
            <input
              id="finder-name"
              className="checkin__input"
              type="text"
              placeholder="Anonymous traveler"
              value={finderName}
              onChange={(e) => setFinderName(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="checkin__field">
            <label className="checkin__label" htmlFor="location">
              Where are you?
            </label>
            <button
              type="button"
              className={`checkin__location-btn${
                status === 'located' ? ' checkin__location-btn--active' : ''
              }`}
              onClick={handleGetLocation}
              disabled={status === 'locating' || status === 'submitting'}
            >
              {status === 'locating' ? '📡 Getting location…' : '📍 Use My Location'}
            </button>
            {status === 'located' && (
              <p className="checkin__location-status checkin__location-status--success">
                ✓ Location captured!
              </p>
            )}
            {status === 'error' && errorMessage && (
              <p className="checkin__location-status checkin__location-status--error">
                {errorMessage}
              </p>
            )}
            <input
              id="location"
              className="checkin__input"
              type="text"
              placeholder="City, Country"
              value={locationDisplay}
              onChange={(e) => {
                const parts = e.target.value.split(',').map((s) => s.trim());
                setCity(parts[0] || '');
                setCountry(parts[1] || '');
              }}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="checkin__field">
            <label className="checkin__label" htmlFor="leave-location">
              Where will you leave me? <span className="checkin__label-optional">(optional)</span>
            </label>
            <input
              id="leave-location"
              className="checkin__input"
              type="text"
              placeholder="Where I'm headed next..."
              value={leaveLocation}
              onChange={(e) => setLeaveLocation(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <div className="checkin__field">
            <label className="checkin__label" htmlFor="message">
              Leave a message <span className="checkin__label-optional">(optional)</span>
            </label>
            <textarea
              id="message"
              className="checkin__textarea"
              placeholder="A thought, a wish, a memory…"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'submitting'}
            />
          </div>

          <button
            type="submit"
            className="checkin__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending…' : 'Leave Your Mark'}
          </button>

          {status === 'error' && errorMessage && !errorMessage.includes('Location') && (
            <p className="checkin__location-status checkin__location-status--error" role="alert">
              {errorMessage}
            </p>
          )}
        </form>

        <div className="section-divider" aria-hidden="true" />
      </div>
    </section>
  );
}
