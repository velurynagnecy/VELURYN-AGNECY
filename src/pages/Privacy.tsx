import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <div style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)', minHeight: '100vh', paddingTop: '150px' }}>
      <Helmet>
        <title>Privacy Policy | VELURYN AGNECY</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="page-content-padding" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-headlines)', fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'var(--font-body)', color: '#444', lineHeight: 1.6 }}>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>Last Updated: August 2026</p>
          <p>
            <strong>VELURYN AGNECY</strong> (stylized with an intentional spelling of "Agnecy") refers to our business entity, referred to throughout this document as "we," "us," or "the Company."
          </p>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>1. Information We Collect</h2>
            <p>At VELURYN AGNECY, we collect information necessary to facilitate UGC campaigns. This includes:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>From Brands:</strong> Company details, campaign briefs, marketing goals, app metrics, and payment/invoicing information.</li>
              <li><strong>From Creators:</strong> Full names, contact details, portfolio links, social media metrics, geographical location, physical appearance characteristics (for casting purposes), and payout information.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>2. How We Use Your Data</h2>
            <p>Your data is strictly used to broker and execute video campaigns. Specifically, we use:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Brand briefs to match campaigns with the most suitable creators.</li>
              <li style={{ marginBottom: '0.5rem' }}>Creator portfolios and niches to pitch relevant talent to our brand partners.</li>
              <li>Payment details to securely process deposits, final invoices, and creator payouts.</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>3. Cookies & Tracking Technologies</h2>
            <p>Our website uses cookies and similar tracking technologies to understand site usage and improve user experience. You can control cookie preferences through your browser settings.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>4. Data Sharing and Protection</h2>
            <p>We do not sell your personal information. We only share data between the specific Brand and matched Creators assigned to an active campaign. For example, a Creator will receive the Brand's product details and brief, and a Brand will receive the Creator's portfolio and watermarked drafts.</p>
            <p style={{ marginTop: '1rem' }}>All financial transactions and payout details are handled securely via encrypted third-party payment processors. We do not store raw banking or credit card details on our local servers.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>5. International Data Transfers</h2>
            <p>As VELURYN AGNECY operates internationally, your data may be processed or stored in countries other than your own, including the United States, United Kingdom, Canada, and Australia. We take reasonable steps to protect your data in accordance with applicable data protection laws regardless of where it is processed.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>6. Data Retention</h2>
            <p>We retain campaign briefs, drafts, and deliverables for as long as reasonably necessary for internal records and dispute resolution, and no longer than 24 months after a campaign concludes, unless a longer period is required by law.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>7. Your Privacy Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data by contacting us at <a href="mailto:vivin.b@velurynagnecy.com" style={{ color: 'inherit', textDecoration: 'underline' }}>vivin.b@velurynagnecy.com</a>. We will respond to verified requests within a reasonable timeframe, and in accordance with applicable law in your jurisdiction.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>8. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from minors.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>9. Contact Us</h2>
            <p>For questions or requests regarding this Privacy Policy, contact us at <a href="mailto:vivin.b@velurynagnecy.com" style={{ color: 'inherit', textDecoration: 'underline' }}>vivin.b@velurynagnecy.com</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
