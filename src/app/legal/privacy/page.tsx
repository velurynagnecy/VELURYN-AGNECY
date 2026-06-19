import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import type { LegalSection } from '@/components/sections/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — VELURYN AGNECY',
  description: 'Privacy Policy explaining how VELURYN AGNECY collects, uses, and protects your information.',
}

const sections: LegalSection[] = [
  {
    number: 1,
    title: 'Introduction',
    blocks: [
      { type: 'paragraph', text: 'This Privacy Policy explains how VELURYN AGNECY collects, uses, and protects information when you use our website or engage our services. We are committed to handling personal information responsibly and transparently.' },
    ],
  },
  {
    number: 2,
    title: 'Information We Collect',
    blocks: [
      { type: 'paragraph', text: 'We may collect:' },
      {
        type: 'list',
        items: [
          'Information you provide directly, such as name, email address, organisation, and the contents of any inquiry or message you submit.',
          'Information related to an engagement, including details you share for the purpose of delivering our services.',
          'Technical information automatically collected when you visit our website, such as browser type, device information, and usage data.',
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'How We Use Information',
    blocks: [
      { type: 'paragraph', text: 'We use information to:' },
      {
        type: 'list',
        items: [
          'Respond to inquiries and assess them prior to scheduling.',
          'Provide, manage, and improve our services.',
          'Communicate with you regarding an engagement.',
          'Maintain the security and integrity of our website and services.',
          'Comply with legal and regulatory obligations.',
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'Legal Basis and Compliance',
    blocks: [
      { type: 'paragraph', text: 'We process personal information in accordance with applicable Indian law, including the Information Technology Act, 2000 and associated rules. Where a VASD assessment involves information about digital entities, such processing is conducted on the basis of evidence and observable trust signals for the purpose of independent assessment.' },
    ],
  },
  {
    number: 5,
    title: 'Confidentiality',
    blocks: [
      { type: 'paragraph', text: 'All submitted information is treated under strict confidentiality protocols. Data is not shared externally without explicit written consent, except where disclosure is required by law.' },
    ],
  },
  {
    number: 6,
    title: 'Data Sharing',
    blocks: [
      { type: 'paragraph', text: 'We do not sell personal information. We may share information only with service providers who support our operations under appropriate confidentiality obligations, or where required by law or to protect our legal rights.' },
    ],
  },
  {
    number: 7,
    title: 'Data Retention',
    blocks: [
      { type: 'paragraph', text: 'We retain personal information only for as long as necessary to fulfil the purposes described in this policy, to meet legal obligations, or to resolve disputes.' },
    ],
  },
  {
    number: 8,
    title: 'Data Security',
    blocks: [
      { type: 'paragraph', text: 'We apply reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, or loss. No method of transmission or storage is fully secure, and we cannot guarantee absolute security.' },
    ],
  },
  {
    number: 9,
    title: 'Your Rights',
    blocks: [
      { type: 'paragraph', text: 'Subject to applicable law, you may request access to, correction of, or deletion of your personal information. To make a request, contact us using the details below.' },
    ],
  },
  {
    number: 10,
    title: 'Third Party Links',
    blocks: [
      { type: 'paragraph', text: 'Our website may contain links to third party sites. We are not responsible for the privacy practices or content of those sites.' },
    ],
  },
  {
    number: 11,
    title: 'Changes to This Policy',
    blocks: [
      { type: 'paragraph', text: 'We may update this Privacy Policy from time to time. The revised version takes effect once published on this website.' },
    ],
  },
  {
    number: 12,
    title: 'Contact',
    blocks: [
      { type: 'paragraph', text: 'For any questions regarding this Privacy Policy or your information, contact us at velurynandoc@gmail.com or vivin.b@velurynagnecy.com.' },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="How VELURYN AGNECY collects, uses, and protects your information."
      lastUpdated="19 June 2026"
      sections={sections}
      crossLinks={[
        { label: 'Terms and Conditions', href: '/legal/terms' },
        { label: 'Disclaimer', href: '/legal/disclaimer' },
      ]}
    />
  )
}
