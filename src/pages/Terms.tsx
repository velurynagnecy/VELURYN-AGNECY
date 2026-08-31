import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <div style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)', minHeight: '100vh', paddingTop: '150px' }}>
      <Helmet>
        <title>Terms of Service | VELURYN AGNECY</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section style={{ padding: '4rem 4rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-headlines)', fontSize: '3rem', marginBottom: '2rem' }}>Terms of Service</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'var(--font-body)', color: '#444', lineHeight: 1.6 }}>
          <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>Last Updated: August 2026</p>
          <p>
            <strong>VELURYN AGNECY</strong> (stylized with an intentional spelling of "Agnecy") refers to our business entity, referred to throughout this document as "we," "us," "the Company," or "the Agency."
          </p>
          
          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>1. Agency Relationship</h2>
            <p>VELURYN AGNECY ("the Agency") acts as a brokerage connecting direct-response brands ("Brands") with User-Generated Content creators ("Creators"). By engaging our services, both Brands and Creators agree to adhere to the workflow and payment terms outlined herein.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>2. Eligibility</h2>
            <p>Creators must be at least 18 years of age, or the age of legal majority in their jurisdiction, to register on the roster or receive payment through the Agency.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>3. Independent Contractor Status</h2>
            <p>Creators engaged through VELURYN AGNECY operate as independent contractors, not employees, agents, or partners of the Agency. Creators are solely responsible for their own tax obligations, equipment, and work methods in fulfilling campaign deliverables.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>4. Campaign Deposits</h2>
            <p>To commence a campaign, Brands must pay a non-refundable upfront deposit of 50% of the total package price. Production will not begin, and Creators will not be dispatched, until this deposit is collected in full.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>5. Currency</h2>
            <p>All package pricing is quoted in United States Dollars (USD) unless otherwise stated in a specific campaign agreement. Clients billed in a non-USD currency will be charged the USD-equivalent amount at the prevailing exchange rate at time of invoicing.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>6. The Watermark-Lock Mechanism</h2>
            <p>All initial content drafts delivered to the Brand for review will include a secure visual watermark. The Brand is strictly prohibited from utilizing, publishing, or distributing these watermarked drafts for commercial or organic use. Unauthorized use of watermarked content constitutes a breach of contract and intellectual property infringement.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>7. Revisions</h2>
            <p>Each campaign package includes one (1) round of minor revisions per video (e.g., text overlay changes, minor pacing edits). Re-shoots or significant deviations from the mutually approved original brief will incur additional charges, billed at standard hourly rates or flat-fee reshoot rates, to be approved by the Brand before execution.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>8. Final Payment and Content Release</h2>
            <p>Upon the Brand's approval of the watermarked drafts, the Agency will issue the final invoice for the remaining 50% balance. The final invoice must be paid within fourteen (14) days. Upon receipt of final payment, the Agency will release the unwatermarked, high-resolution files to the Brand.</p>
            <p>If the final payment is not received by the deadline, all usage rights are revoked, and the content reverts to draft-only status. The Agency reserves the right to pursue collections on unpaid balances.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>9. Creator Compensation</h2>
            <p>Creators will receive a portion of the initial deposit once production commences. The remaining balance of the Creator's negotiated rate will be disbursed immediately following the Agency's receipt of the Brand's final payment.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>10. Intellectual Property & Usage Rights</h2>
            <p>Upon full and final payment, the Brand receives a license to use delivered video content for organic (non-paid) social media and marketing purposes. Rights to use content in paid advertising, whitelisting, or spark ad campaigns must be separately negotiated and are not included in the base package price unless explicitly stated in the campaign agreement. The Agency and Creator retain underlying ownership of raw and unused footage. Creators grant the Agency and the applicable Brand a license to use delivered final content as specified in the applicable campaign agreement.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>11. Content & Media</h2>
            <p>Images used throughout this website, including but not limited to photography featured on the homepage and other pages, may include licensed stock photography used for illustrative purposes only. These images do not necessarily depict actual VELURYN AGNECY staff, creators, clients, or campaign footage unless explicitly stated otherwise.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>12. Prohibited Content</h2>
            <p>Content produced under this agreement must not contain illegal, defamatory, infringing, or fraudulent material. Brands are responsible for ensuring product claims featured in content are accurate and comply with applicable advertising regulations in their target markets. The Agency reserves the right to refuse production or distribution of content that violates this section.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>13. Cancellation & Termination</h2>
            <p>Either party may terminate an active campaign engagement in writing. Deposits already paid are non-refundable as stated in Section 4. If a Brand cancels after Creators have been dispatched but before final delivery, Creators are still entitled to their disbursed portion of the deposit as outlined in Section 9.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>14. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, VELURYN AGNECY's total liability arising from any campaign engagement shall not exceed the total amount paid by the Brand for that specific campaign. The Agency is not liable for indirect, incidental, or consequential damages, including lost profits or lost business opportunities arising from campaign performance.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>15. Indemnification</h2>
            <p>Brands and Creators each agree to indemnify and hold the Agency harmless from claims arising from their own content, product claims, or conduct in violation of these Terms.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>16. Business Status Disclosure</h2>
            <p>VELURYN AGNECY currently operates as an unregistered business. Services under this brand name are provided by the individual operator, and this document does not constitute governance under a registered corporate entity. Any disputes arising under these Terms will first be addressed through good-faith negotiation between the parties before pursuing formal proceedings.</p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.5rem', marginBottom: '1rem', color: '#111' }}>17. Changes to These Terms</h2>
            <p>The Agency may update these Terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated Terms.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
