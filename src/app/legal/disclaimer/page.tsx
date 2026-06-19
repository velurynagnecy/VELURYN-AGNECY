import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import type { LegalSection } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer — VELURYN AGNECY',
  description: 'Disclaimer governing the use of information and assessments provided by VELURYN AGNECY.',
}

const sections: LegalSection[] = [
  {
    number: 1,
    title: 'General',
    blocks: [
      { type: 'paragraph', text: 'The information provided by VELURYN AGNECY through this website and our services, including VA MGMT and VASD, is for general informational and professional purposes only. By accessing this website or engaging our services, you accept the terms of this Disclaimer.' },
    ],
  },
  {
    number: 2,
    title: 'Nature of VASD Assessments',
    blocks: [
      { type: 'paragraph', text: 'VASD is a trust authority infrastructure that produces independent assessments of digital entities based on observable trust signals, available evidence, and probabilistic analysis. All VASD assessments are probabilistic and reflect the information available at the time of review.' },
      { type: 'paragraph', text: 'A VASD assessment is an opinion on trust signals, not a statement of fact, certification of legitimacy, or guarantee of any kind.' },
    ],
  },
  {
    number: 3,
    title: 'No Guarantee of Outcomes',
    blocks: [
      { type: 'paragraph', text: 'VELURYN AGNECY does not guarantee the future conduct, performance, solvency, honesty, or integrity of any entity assessed. A favourable assessment does not warrant that an entity is safe to transact with, and an unfavourable assessment does not constitute an allegation of wrongdoing.' },
      { type: 'paragraph', text: 'Any classification such as Trusted, Suspicious, or High Risk is a probabilistic indicator only.' },
    ],
  },
  {
    number: 4,
    title: 'Not Law Enforcement',
    blocks: [
      { type: 'paragraph', text: 'VASD is not a law enforcement function, regulatory body, or investigative authority. We do not make legal determinations of fraud, criminality, or liability. Assessments operate within the framework of the Information Technology Act, 2000 (India) and do not replace any official, legal, or regulatory process.' },
    ],
  },
  {
    number: 5,
    title: 'Not Professional Advice',
    blocks: [
      { type: 'paragraph', text: 'Nothing on this website or in our assessments constitutes legal, financial, investment, tax, or other professional advice. You should obtain independent professional advice before making any decision. Any reliance you place on our information or assessments is strictly at your own risk.' },
    ],
  },
  {
    number: 6,
    title: 'Decision Responsibility',
    blocks: [
      { type: 'paragraph', text: 'All decisions made on the basis of a VASD assessment or any information provided by VELURYN AGNECY remain solely the responsibility of the recipient. VELURYN AGNECY accepts no responsibility for any action taken, or not taken, in reliance on our assessments or content.' },
    ],
  },
  {
    number: 7,
    title: 'Third Party Information',
    blocks: [
      { type: 'paragraph', text: 'Our assessments may draw on third party and publicly available sources. We do not control and are not responsible for the accuracy, completeness, or reliability of third party information.' },
    ],
  },
  {
    number: 8,
    title: 'Limitation of Liability',
    blocks: [
      { type: 'paragraph', text: 'To the maximum extent permitted by law, VELURYN AGNECY shall not be liable for any loss or damage, whether direct, indirect, incidental, consequential, or otherwise, arising from the use of this website, our services, or any assessment.' },
    ],
  },
  {
    number: 9,
    title: 'Changes',
    blocks: [
      { type: 'paragraph', text: 'We may update this Disclaimer from time to time. The revised version takes effect once published on this website.' },
    ],
  },
  {
    number: 10,
    title: 'Contact',
    blocks: [
      { type: 'paragraph', text: 'For any questions regarding this Disclaimer, contact us at velurynandoc@gmail.com or vivin.b@velurynagnecy.com.' },
    ],
  },
]

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Important limitations and conditions governing VELURYN AGNECY assessments and content."
      lastUpdated="19 June 2026"
      sections={sections}
      crossLinks={[
        { label: 'Terms and Conditions', href: '/legal/terms' },
        { label: 'Privacy Policy', href: '/legal/privacy' },
      ]}
    />
  )
}
