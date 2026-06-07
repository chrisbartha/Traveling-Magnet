import Link from 'next/link';

export default function MagnetNotFound() {
  return (
    <div className="not-found">
      <div className="not-found__number">404</div>
      <h1 className="not-found__title">Magnet Not Found</h1>
      <p className="not-found__text">
        This magnet number doesn&apos;t exist or is no longer active.
        <br />
        Please check the QR code and try again.
      </p>
      <Link href="/" className="not-found__link">
        Go Home
      </Link>
    </div>
  );
}
