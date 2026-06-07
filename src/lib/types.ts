// ============================================================
// Traveling Magnet — TypeScript Types
// Mirror of the Supabase database schema
// ============================================================

export interface Magnet {
  id: number;
  number: number;
  label: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Person {
  id: number;
  name: string;
  bio: string | null;
  photo_url: string | null;
  gallery_urls: string[];
  birth_date: string | null;
  passing_date: string | null;
  quote: string | null;
  created_at: string;
  updated_at: string;
}

export interface CheckIn {
  id: number;
  magnet_id: number;
  finder_name: string;
  city: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  message: string | null;
  created_at: string;
}

export interface CheckInInsert {
  magnet_id: number;
  finder_name?: string;
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password: string;
  created_at: string;
}
