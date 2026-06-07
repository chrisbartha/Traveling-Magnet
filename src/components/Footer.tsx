import Link from 'next/link';

interface FooterProps {
  personName: string;
}

export default function Footer({ personName }: FooterProps) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__values">
          <span className="footer__value-item">✦ No Owner</span>
          <span className="footer__value-item">✦ No Borders</span>
          <span className="footer__value-item">✦ Just Connection</span>
          <span className="footer__value-item">✦ Pass It On</span>
        </div>

        <p className="footer__message">
          Help keep {personName}&apos;s memory alive. Pass this magnet along.
        </p>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link href="/about" className="footer__link">
            About This Project
          </Link>
        </nav>

        <p className="footer__credit">Made with 💛 in memory of those we carry with us</p>
      </div>
    </footer>
  );
}
