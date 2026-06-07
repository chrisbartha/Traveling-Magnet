'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Magnet, Person, CheckIn } from '@/lib/types';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [magnets, setMagnets] = useState<Magnet[]>([]);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [person, setPerson] = useState<Person | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Temporary hardcoded auth — will improve later
    if (username === 'chris' && password === 'password') {
      setAuthenticated(true);
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    const fetchData = async () => {
      const supabase = createClient();

      // Fetch all magnets
      const { data: magnetData } = await supabase
        .from('magnets')
        .select('*')
        .order('number', { ascending: true });

      if (magnetData) setMagnets(magnetData);

      // Fetch recent check-ins (last 50)
      const { data: checkinData } = await supabase
        .from('checkins')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (checkinData) setCheckins(checkinData);

      // Fetch person info
      const { data: personData } = await supabase
        .from('person')
        .select('*')
        .limit(1)
        .single();

      if (personData) setPerson(personData);
    };

    fetchData();
  }, [authenticated]);

  // Count check-ins per magnet
  const checkinCountByMagnet = checkins.reduce(
    (acc, ci) => {
      acc[ci.magnet_id] = (acc[ci.magnet_id] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  // Find magnet number by magnet ID
  const magnetNumberById = magnets.reduce(
    (acc, m) => {
      acc[m.id] = m.number;
      return acc;
    },
    {} as Record<number, number>
  );

  if (!authenticated) {
    return (
      <div className="admin">
        <div className="admin__header">
          <h1 className="admin__title">Admin Panel</h1>
        </div>
        <form className="admin__login" onSubmit={handleLogin}>
          <h2 className="admin__login-title">Sign In</h2>
          <div className="checkin__field">
            <label className="checkin__label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="checkin__input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              autoComplete="username"
            />
          </div>
          <div className="checkin__field">
            <label className="checkin__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="checkin__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <button type="submit" className="checkin__submit">
            Log In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin__header">
        <h1 className="admin__title">Admin Panel</h1>
        {person && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Memorial for <strong style={{ color: 'var(--color-gold)' }}>{person.name}</strong>
          </p>
        )}
      </div>

      <div className="admin__panel">
        {/* Magnets Section */}
        <div className="admin__section">
          <h2 className="admin__section-title">Magnets</h2>
          <table className="admin__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Check-ins</th>
              </tr>
            </thead>
            <tbody>
              {magnets.map((magnet) => (
                <tr key={magnet.id}>
                  <td>Magnet #{magnet.number}</td>
                  <td>
                    <span
                      className={`admin__badge ${
                        magnet.is_active
                          ? 'admin__badge--active'
                          : 'admin__badge--inactive'
                      }`}
                    >
                      {magnet.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{checkinCountByMagnet[magnet.id] ?? 0}</td>
                </tr>
              ))}
              {magnets.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', color: 'var(--color-text-dim)' }}>
                    No magnets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Check-ins Section */}
        <div className="admin__section">
          <h2 className="admin__section-title">Recent Check-ins</h2>
          <table className="admin__table">
            <thead>
              <tr>
                <th>Magnet</th>
                <th>Finder</th>
                <th>City</th>
                <th>Date</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {checkins.map((ci) => (
                <tr key={ci.id}>
                  <td>#{magnetNumberById[ci.magnet_id] ?? '?'}</td>
                  <td>{ci.finder_name || '—'}</td>
                  <td>
                    {ci.city || '—'}
                    {ci.country ? `, ${ci.country}` : ''}
                  </td>
                  <td>
                    {new Date(ci.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td
                    style={{
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ci.message || '—'}
                  </td>
                </tr>
              ))}
              {checkins.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-dim)' }}>
                    No check-ins yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
