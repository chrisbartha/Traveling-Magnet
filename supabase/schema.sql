-- ============================================================
-- Traveling Magnet — Database Schema
-- Run this in the Supabase SQL Editor to set up all tables
-- ============================================================

-- ─── MAGNETS ────────────────────────────────────────────────
-- Each physical magnet gets a row. The `number` is what's
-- printed on the magnet and encoded in the QR code URL.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS magnets (
  id          SERIAL PRIMARY KEY,
  number      INTEGER UNIQUE NOT NULL,
  label       TEXT,                            -- Optional friendly label ("The Golden Gate One")
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE magnets IS 'Each unique traveling magnet in the world';
COMMENT ON COLUMN magnets.number IS 'Display number printed on the magnet, used in the URL /magnet/[number]';


-- ─── PERSON ─────────────────────────────────────────────────
-- Information about the person being remembered.
-- Single row for now, but table-based for extensibility.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS person (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  bio           TEXT,                          -- Tribute / about text
  photo_url     TEXT,                          -- URL to main hero photo
  gallery_urls  TEXT[] DEFAULT '{}',           -- Array of additional photo URLs
  birth_date    DATE,
  passing_date  DATE,
  quote         TEXT,                          -- A favorite quote or saying
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE person IS 'The person being remembered — their story lives here';


-- ─── CHECK-INS ──────────────────────────────────────────────
-- Each time someone finds a magnet and checks in their location.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS checkins (
  id            SERIAL PRIMARY KEY,
  magnet_id     INTEGER NOT NULL REFERENCES magnets(id) ON DELETE CASCADE,
  finder_name   TEXT DEFAULT 'Anonymous',      -- Display name of the finder
  city          TEXT,                          -- Resolved city name
  country       TEXT,                          -- Resolved country
  latitude      DOUBLE PRECISION,             -- From Geolocation API
  longitude     DOUBLE PRECISION,             -- From Geolocation API
  message       TEXT,                          -- Optional note from the finder
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Fast lookups: all check-ins for a specific magnet, newest first
CREATE INDEX idx_checkins_magnet_id ON checkins(magnet_id);
CREATE INDEX idx_checkins_created_at ON checkins(created_at DESC);

COMMENT ON TABLE checkins IS 'Location check-ins from people who find a traveling magnet';


-- ─── ADMIN USERS (simple auth) ──────────────────────────────
-- Very simple admin credentials table for the /admin page.
-- In production, replace with Supabase Auth or a proper auth flow.
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admin_users (
  id          SERIAL PRIMARY KEY,
  username    TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,                   -- Plain text for now (MVP only!)
  created_at  TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE admin_users IS 'Simple admin credentials — replace with proper auth in production';


-- ─── ROW LEVEL SECURITY ─────────────────────────────────────
-- Public visitors can read magnets, person, and check-ins.
-- Public visitors can INSERT check-ins (no auth required).
-- Admin tables are not publicly accessible.
-- ─────────────────────────────────────────────────────────────

-- Magnets: public read-only
ALTER TABLE magnets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "magnets_public_read" ON magnets
  FOR SELECT USING (true);

-- Person: public read-only
ALTER TABLE person ENABLE ROW LEVEL SECURITY;
CREATE POLICY "person_public_read" ON person
  FOR SELECT USING (true);

-- Check-ins: public read + insert
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "checkins_public_read" ON checkins
  FOR SELECT USING (true);
CREATE POLICY "checkins_public_insert" ON checkins
  FOR INSERT WITH CHECK (true);

-- Admin users: no public access (accessed via service role key only)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- No public policies = no public access
