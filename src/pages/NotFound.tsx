import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-white)', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '150px' }}>
      <Helmet>
        <title>404 - Not Found | VELURYN AGNECY</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section style={{ 
        minHeight: '60vh',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-white)'
      }}>
        <h1 style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(5rem, 15vw, 12rem)', lineHeight: 1, margin: '0 0 1rem 0' }}>
          404
        </h1>
        <p style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', marginBottom: '2rem' }}>
          This page doesn't exist — but we do.
        </p>
        <Link to="/" className="button" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
          Return Home
        </Link>
      </section>
    </div>
  );
}
