import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import type { LegalSection } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Terms and Conditions — VELURYN AGNECY',
  description: 'Terms and Conditions governing access to and use of the VELURYN AGNECY website and services.',
}

const sections: LegalSection[] = [
  {
    number: 1,
    title: 'Introduction',
    blocks: [
      { type: 'paragraph', text: 'These Terms and Conditions govern your access to and use of the VELURYN AGNECY website and the services provided through it, including VASD. By accessing this website or engaging our services, you agree to these Terms. If you do not agree, please discontinue use.' },
    ],
  },
  {
    number: 2,
    title: 'About VELURYN AGNECY',
    blocks: [
      { type: 'paragraph', text: 'VELURYN AGNECY is a global digital agency based in India, operating remotely. Our services include trust authority infrastructure under VASD.' },
    ],
  },
  {
    number: 3,
    title: 'Services',
    blocks: [
      { type: 'paragraph', text: 'We provide the services described on this website. Scope, deliverables, timelines, and fees for any engagement are confirmed in writing prior to commencement. We reserve the right to refuse, modify, or discontinue any service at our discretion.' },
    ],
  },
  {
    number: 4,
    title: 'Nature of VASD Assessments',
    blocks: [
      { type: 'paragraph', text: 'VASD is a trust authority infrastructure that produces independent, evidence-based assessments of digital entities. All VASD assessments are probabilistic in nature and reflect observable trust signals and available information at the time of review.' },
      { type: 'paragraph', text: 'VASD does not guarantee the future conduct, performance, solvency, or integrity of any entity. VASD is not a law enforcement function and does not constitute legal, financial, or investment advice. Assessments operate within the framework of the Information Technology Act, 2000 (India). Any decision made on the basis of a VASD assessment remains solely the responsibility of the recipient.' },
    ],
  },
  {
    number: 5,
    title: 'Client Responsibilities',
    blocks: [
      { type: 'paragraph', text: 'You agree to provide accurate, complete, and lawful information in connection with any engagement. You are responsible for ensuring you have the rights and authorisations necessary for any material, access, or data you provide to us.' },
    ],
  },
  {
    number: 6,
    title: 'Fees and Payment',
    blocks: [
      { type: 'paragraph', text: 'Fees are agreed in writing before work begins. Unless otherwise stated, payment is due before the relevant service or session commences. All fees are exclusive of applicable taxes unless stated otherwise.' },
    ],
  },
  {
    number: 7,
    title: 'Intellectual Property',
    blocks: [
      { type: 'paragraph', text: 'All content on this website, including text, design, branding, logos, and the VELURYN AGNECY and VASD names and marks, is owned by VELURYN AGNECY and protected by applicable law. You may not copy, reproduce, distribute, or create derivative works without our prior written consent. Deliverables produced for a client are governed by the terms of the relevant engagement.' },
    ],
  },
  {
    number: 8,
    title: 'Confidentiality',
    blocks: [
      { type: 'paragraph', text: 'Information exchanged in the course of an engagement is treated as confidential and is not shared externally without explicit written consent, except where disclosure is required by law.' },
    ],
  },
  {
    number: 9,
    title: 'Third Party Links and Sources',
    blocks: [
      { type: 'paragraph', text: 'Our website and assessments may reference third party sources or links. We are not responsible for the content, accuracy, or practices of any third party.' },
    ],
  },
  {
    number: 10,
    title: 'Limitation of Liability',
    blocks: [
      { type: 'paragraph', text: 'To the maximum extent permitted by law, VELURYN AGNECY shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of this website or our services. Our total aggregate liability for any claim shall not exceed the fees paid for the specific service giving rise to the claim.' },
    ],
  },
  {
    number: 11,
    title: 'Disclaimer of Warranties',
    blocks: [
      { type: 'paragraph', text: 'This website and our services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, except as expressly stated in a written engagement.' },
    ],
  },
  {
    number: 12,
    title: 'Changes to These Terms',
    blocks: [
      { type: 'paragraph', text: 'We may update these Terms from time to time. The revised version takes effect once published on this website. Continued use after changes constitutes acceptance.' },
    ],
  },
  {
    number: 13,
    title: 'Governing Law',
    blocks: [
      { type: 'paragraph', text: 'These Terms are governed by the laws of India, and any disputes shall be subject to the jurisdiction of the courts of India.' },
    ],
  },
  {
    number: 14,
    title: 'Contact',
    blocks: [
      { type: 'paragraph', text: 'For any questions regarding these Terms, contact us at velurynandoc@gmail.com or vivin.b@velurynagnecy.com.' },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      subtitle="Please read these Terms carefully before using our website or services."
      lastUpdated="19 June 2026"
      sections={sections}
      crossLinks={[
        { label: 'Privacy Policy', href: '/legal/privacy' },
        { label: 'Disclaimer', href: '/legal/disclaimer' },
      ]}
    />
  )
}
