-- ============================================================
-- Traveling Magnet — Seed Data
-- Run this AFTER schema.sql in the Supabase SQL Editor
-- ============================================================

-- ─── SEED PERSON ────────────────────────────────────────────
-- Memorial for Jázmin
-- ─────────────────────────────────────────────────────────────

INSERT INTO person (name, bio, photo_url, quote) VALUES (
  'Jázmin',
  'Jázmin had a special way of making everyone feel seen, heard, and loved. She believed in kindness, adventure, and the beauty of human connection. This project carries her spirit forward — bringing people together, one magnet at a time.',
  '',
  '"Her light continues to travel the world."'
);


-- ─── SEED MAGNETS (1–40) ───────────────────────────────────
-- 40 magnets seeded as a precautionary buffer.
-- Each magnet number maps to a URL: /magnet/[number]
-- ─────────────────────────────────────────────────────────────

INSERT INTO magnets (number) VALUES
  (1), (2), (3), (4), (5), (6), (7), (8), (9), (10),
  (11), (12), (13), (14), (15), (16), (17), (18), (19), (20),
  (21), (22), (23), (24), (25), (26), (27), (28), (29), (30),
  (31), (32), (33), (34), (35), (36), (37), (38), (39), (40);


-- ─── SEED ADMIN USER ────────────────────────────────────────
-- Default admin credentials (change in production!)
-- ─────────────────────────────────────────────────────────────

INSERT INTO admin_users (username, password) VALUES
  ('chris', 'password');


-- ─── SEED EXAMPLE CHECK-INS (for development/demo) ─────────
-- These give you something to look at while building.
-- Delete these before going live, or keep them!
-- ─────────────────────────────────────────────────────────────

INSERT INTO checkins (magnet_id, finder_name, city, country, latitude, longitude, message) VALUES
  (1, 'Chris', 'San Francisco, CA', 'United States', 37.7749, -122.4194, 'The very first magnet begins its journey. Fly far, little one. 💛'),
  (1, 'Sarah', 'Portland, OR', 'United States', 45.5152, -122.6784, 'Found this at a coffee shop downtown. What a beautiful idea.'),
  (1, 'Kenji', 'Tokyo', 'Japan', 35.6762, 139.6503, 'This magnet made it all the way across the Pacific! Sending love.');
