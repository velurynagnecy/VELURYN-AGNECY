import { Fragment, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/site';
import { PageHero } from '../components/ui';

type Block = { h: string; p: string[]; list?: string[] };

const mail = (t: string): ReactNode =>
  t.split(SITE.email).map((part, i, arr) => (
    <Fragment key={i}>
      {part}
      {i < arr.length - 1 && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
    </Fragment>
  ));

function LegalPage({ title, desc, updated, blocks }: { title: string; desc: string; updated: string; blocks: Block[] }) {
  return (
    <>
      <Helmet>
        <title>{title} | VELURYN AGNECY</title>
        <meta name="description" content={desc} />
      </Helmet>
      <PageHero
        eyebrow="Legal"
        lines={[title]}
        lead={`Last updated: ${updated}. ${desc}`}
        img="contact-hero.png"
        compact
      />
      <section style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="wrap" style={{ maxWidth: '54rem' }}>
          <div className="prose">
            {blocks.map((b, i) => (
              <Fragment key={b.h}>
                <h2>
                  {i + 1}. {b.h}
                </h2>
                {b.p.map((t, j) => (
                  <p key={j}>{mail(t)}</p>
                ))}
                {b.list && (
                  <ul>
                    {b.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const WHO: Block = {
  h: 'Who this covers',
  p: [
    'VELURYN AGNECY (stylized with an intentional spelling of "Agnecy") refers to our business, referred to in this document as "we," "us," or "the Company."',
    'This document covers VELURYN AGNECY and its divisions: VELURYN STUDIO (the AI ads and UGC creative studio on this website, at velurynagnecy.com/studio), and ICA (ica.velurynagnecy.com), the International Contract Agency, our cyber security division. Each division may add its own terms for its own services.',
    'VASD was previously a distinct offering. It has since been advanced into ICA and is no longer offered under the VASD name.',
  ],
};

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      desc="How VELURYN AGNECY, VELURYN STUDIO and ICA collect, use and protect your information."
      updated="October 2026"
      blocks={[
        WHO,
        {
          h: 'Information We Collect',
          p: ['We collect information necessary to facilitate our campaigns and services.'],
          list: [
            'From brands: company details, campaign briefs, marketing goals, campaign metrics, and payment and invoicing information.',
            'From creators: full names, contact details, portfolio links, social media metrics, geographical location, physical appearance characteristics (for casting purposes), and payout information.',
            'From anyone who contacts us: the details you type into our forms or email to us.',
          ],
        },
        {
          h: 'How We Use Your Data',
          p: ['Your data is used to broker and execute campaigns and to reply to you. Specifically, we use:'],
          list: [
            'Brand briefs to match campaigns with the most suitable creators.',
            'Creator portfolios and niches to pitch relevant talent to our brand partners.',
            'Payment details to securely process deposits, final invoices, and creator payouts.',
          ],
        },
        {
          h: 'Forms and Email',
          p: ['The forms on our websites are delivered to us by FormSubmit (formsubmit.co), a third party form service. What you enter in a form is sent to our inbox at ' + SITE.email + ' through that service.'],
        },
        {
          h: 'Cookies & Tracking Technologies',
          p: ['Our website uses cookies and similar technologies to understand site usage and improve your experience. You can control cookie preferences through your browser settings.'],
        },
        {
          h: 'Data Sharing and Protection',
          p: [
            'We do not sell your personal information. We only share data between the specific brand and matched creators assigned to an active campaign. For example, a creator will receive the brand\'s product details and brief, and a brand will receive the creator\'s portfolio and watermarked drafts.',
            'All financial transactions and payout details are handled securely via encrypted third-party payment processors. We do not store raw banking or credit card details on our local servers.',
          ],
        },
        {
          h: 'International Data Transfers',
          p: ['As VELURYN AGNECY operates internationally, your data may be processed or stored in countries other than your own, including the United States, United Kingdom, Canada, and Australia. We take reasonable steps to protect your data in accordance with applicable data protection laws regardless of where it is processed.'],
        },
        {
          h: 'Data Retention',
          p: ['We retain campaign briefs, drafts, and deliverables for as long as reasonably necessary for internal records and dispute resolution, and no longer than 24 months after a campaign concludes, unless a longer period is required by law.'],
        },
        {
          h: 'Your Privacy Rights',
          p: ['You may request access to, correction of, or deletion of your personal data by contacting us at ' + SITE.email + '. We will respond to verified requests within a reasonable timeframe, and in accordance with applicable law in your jurisdiction.'],
        },
        {
          h: "Children's Privacy",
          p: ['Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from minors.'],
        },
        { h: 'Contact Us', p: ['For questions or requests regarding this Privacy Policy, contact us at ' + SITE.email] },
      ]}
    />
  );
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      desc="The terms for working with VELURYN AGNECY, VELURYN STUDIO and ICA."
      updated="October 2026"
      blocks={[
        WHO,
        {
          h: 'Agency Relationship',
          p: ['VELURYN AGNECY ("the Agency") acts as a brokerage connecting direct response brands ("Brands") with user generated content creators ("Creators"). By engaging our services, both Brands and Creators agree to adhere to the workflow and payment terms outlined herein.'],
        },
        { h: 'Eligibility', p: ['Creators must be at least 18 years of age, or the age of legal majority in their jurisdiction, to register on the roster or receive payment through the Agency.'] },
        {
          h: 'ICA',
          p: ['ICA, the International Contract Agency, does cyber security work. Organizations and individuals may apply. ICA engagements are fixed contracts agreed in writing.'],
        },
        {
          h: 'Independent Contractor Status',
          p: ['Creators engaged through VELURYN AGNECY operate as independent contractors, not employees, agents, or partners of the Agency. Creators are solely responsible for their own tax obligations, equipment, and work methods in fulfilling campaign deliverables.'],
        },
        { h: 'Campaign Deposits', p: ['To commence a campaign, Brands must pay a non-refundable upfront deposit of 50% of the total package price. Production will not begin, and Creators will not be dispatched, until this deposit is collected in full.'] },
        { h: 'Currency', p: ['All package pricing is quoted in United States Dollars (USD) unless otherwise stated in a specific campaign agreement. Clients billed in a non-USD currency will be charged the USD-equivalent amount at the prevailing exchange rate at time of invoicing.'] },
        { h: 'The Watermark-Lock Mechanism', p: ['All initial content drafts delivered to the Brand for review will include a secure visual watermark. The Brand is strictly prohibited from utilizing, publishing, or distributing these watermarked drafts for commercial or organic use. Unauthorized use of watermarked content constitutes a breach of contract and intellectual property infringement.'] },
        { h: 'Revisions', p: ['Each campaign package includes one (1) round of minor revisions per video (e.g., text overlay changes, minor pacing edits). Re-shoots or significant deviations from the mutually approved original brief will incur additional charges, billed at standard hourly rates or flat-fee reshoot rates, to be approved by the Brand before execution.'] },
        {
          h: 'Final Payment and Content Release',
          p: [
            "Upon the Brand's approval of the watermarked drafts, the Agency will issue the final invoice for the remaining 50% balance. The final invoice must be paid within fourteen (14) days. Upon receipt of final payment, the Agency will release the unwatermarked, high-resolution files to the Brand.",
            'If the final payment is not received by the deadline, all usage rights are revoked, and the content reverts to draft-only status. The Agency reserves the right to pursue collections on unpaid balances.',
          ],
        },
        { h: 'Creator Compensation', p: ["Creators will receive a portion of the initial deposit once production commences. The remaining balance of the Creator's negotiated rate will be disbursed immediately following the Agency's receipt of the Brand's final payment."] },
        { h: 'Intellectual Property & Usage Rights', p: ['Upon full and final payment, the Brand receives a license to use delivered video content for organic (non-paid) social media and marketing purposes. Rights to use content in paid advertising, whitelisting, or spark ad campaigns must be separately negotiated and are not included in the base package price unless explicitly stated in the campaign agreement. The Agency and Creator retain underlying ownership of raw and unused footage. Creators grant the Agency and the applicable Brand a license to use delivered final content as specified in the applicable campaign agreement.'] },
        { h: 'Content & Media', p: ['Images used throughout this website, including but not limited to photography featured on the homepage and other pages, may include licensed stock photography used for illustrative purposes only. These images do not necessarily depict actual VELURYN AGNECY staff, creators, clients, or campaign footage unless explicitly stated otherwise.'] },
        { h: 'Prohibited Content', p: ['Content produced under this agreement must not contain illegal, defamatory, infringing, or fraudulent material. Brands are responsible for ensuring product claims featured in content are accurate and comply with applicable advertising regulations in their target markets. The Agency reserves the right to refuse production or distribution of content that violates this section.'] },
        { h: 'Cancellation & Termination', p: ['Either party may terminate an active campaign engagement in writing. Deposits already paid are non-refundable as stated in the Campaign Deposits section. If a Brand cancels after Creators have been dispatched but before final delivery, Creators are still entitled to their disbursed portion of the deposit as outlined in the Creator Compensation section.'] },
        { h: 'Limitation of Liability', p: ["To the maximum extent permitted by law, VELURYN AGNECY's total liability arising from any campaign engagement shall not exceed the total amount paid by the Brand for that specific campaign. The Agency is not liable for indirect, incidental, or consequential damages, including lost profits or lost business opportunities arising from campaign performance."] },
        { h: 'Indemnification', p: ['Brands and Creators each agree to indemnify and hold the Agency harmless from claims arising from their own content, product claims, or conduct in violation of these Terms.'] },
        { h: 'Business Status Disclosure', p: ['VELURYN AGNECY currently operates as an unregistered business. Services under this brand name are provided by the individual operator, and this document does not constitute governance under a registered corporate entity. Any disputes arising under these Terms will first be addressed through good-faith negotiation between the parties before pursuing formal proceedings.'] },
        { h: 'Changes to These Terms', p: ['The Agency may update these Terms from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated Terms.'] },
      ]}
    />
  );
}
