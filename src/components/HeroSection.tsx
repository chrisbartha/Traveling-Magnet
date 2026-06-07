'use client';

interface HeroSectionProps {
  magnetNumber: number;
}

export default function HeroSection({ magnetNumber }: HeroSectionProps) {
  const handleScrollClick = () => {
    const memorial = document.getElementById('memorial');
    if (memorial) {
      memorial.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" aria-label="Hero">
      <p className="hero__eyebrow">You are holding</p>
      <h1 className="hero__title">Traveling Magnet</h1>
      <p className="hero__number">#{magnetNumber}</p>
      <p className="hero__tagline">Love, Connection, Adventure</p>
      <p className="hero__message">
        Please take me with you and leave me somewhere <em>new</em> for someone else to find.
      </p>

      <button
        className="hero__continue-btn"
        onClick={handleScrollClick}
        aria-label="Scroll to memorial section"
        type="button"
      >
        <span className="hero__continue-btn-text">Continue</span>
        <span className="hero__continue-arrow" aria-hidden="true"></span>
      </button>
    </section>
  );
}
