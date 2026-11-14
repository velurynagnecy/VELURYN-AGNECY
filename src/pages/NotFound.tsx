import { Helmet } from 'react-helmet-async';
import { Button, PageHero } from '../components/ui';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page not found | VELURYN AGNECY</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <PageHero
        eyebrow="404 Error"
        lines={['This page', 'does not exist']}
        lead="The link you followed may be broken or the page may have been moved."
        img="home-hero.png"
        compact
      >
        <div style={{ marginTop: '0.8rem' }}>
          <Button to="/">Back home</Button>
        </div>
      </PageHero>
    </>
  );
}
