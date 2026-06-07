import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import type { Magnet, Person, CheckIn } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import MemorialSection from '@/components/MemorialSection';
import StatsSection from '@/components/StatsSection';
import MagnetInfoStrip from '@/components/MagnetInfoStrip';
import JourneyTimeline from '@/components/JourneyTimeline';
import JourneyContinues from '@/components/JourneyContinues';
import CheckInForm from '@/components/CheckInForm';
import Footer from '@/components/Footer';

type Props = {
  params: Promise<{ number: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  return {
    title: `Traveling Magnet #${number}`,
  };
}

export default async function MagnetPage({ params }: Props) {
  const { number } = await params;
  const magnetNumber = parseInt(number, 10);

  if (isNaN(magnetNumber)) {
    notFound();
  }

  const supabase = await createClient();

  // Fetch the magnet by its number
  const { data: magnet } = await supabase
    .from('magnets')
    .select('*')
    .eq('number', magnetNumber)
    .single<Magnet>();

  if (!magnet || !magnet.is_active) {
    notFound();
  }

  // Fetch the person data (single memorial subject)
  const { data: person } = await supabase
    .from('person')
    .select('*')
    .limit(1)
    .single<Person>();

  // Fallback person if DB is empty
  const safePerson: Person = person ?? {
    id: 0,
    name: 'Your Loved One',
    bio: 'Their story will live here.',
    photo_url: null,
    gallery_urls: [],
    birth_date: null,
    passing_date: null,
    quote: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Fetch all check-ins for this magnet, newest first
  const { data: checkins } = await supabase
    .from('checkins')
    .select('*')
    .eq('magnet_id', magnet.id)
    .order('created_at', { ascending: false })
    .returns<CheckIn[]>();

  const safeCheckins = checkins ?? [];

  return (
    <main>
      <HeroSection magnetNumber={magnet.number} />
      <MemorialSection person={safePerson} />
      <StatsSection checkins={safeCheckins} magnet={magnet} />
      <MagnetInfoStrip magnet={magnet} checkins={safeCheckins} />
      <JourneyTimeline checkins={safeCheckins} />
      <JourneyContinues />
      <CheckInForm magnetId={magnet.id} />
      <Footer personName={safePerson.name} />
    </main>
  );
}
