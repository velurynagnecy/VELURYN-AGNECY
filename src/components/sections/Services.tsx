'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'

const services = [
  { 
    n: '01', 
    title: 'VASD (Trust Verdict)', 
    arm: 'Intelligence', 
    desc: 'What it is: A trust verdict for brands and creators that verifies the credibility and legitimacy of a counterpart before you sign a deal. Who it is for: Brands, creators, and agencies facing high-risk transactions. What you get: A formal, evidence-based intelligence report clearing or blocking a potential partner.',
    imgSrc: '/assets/image4.png'
  },
  { 
    n: '02', 
    title: 'Web Design', 
    arm: 'Digital', 
    desc: 'What it is: High-end, corporate, and editorial website design focusing on UX, conversion, and brand authority. Who it is for: Enterprises and luxury brands needing a digital facelift. What you get: A complete set of Figma designs, wireframes, and design systems ready for development.' 
  },
  { 
    n: '03', 
    title: 'Web Elevation', 
    arm: 'Development', 
    desc: 'What it is: Full-stack web development and engineering to elevate your digital presence with modern architecture. Who it is for: Companies needing fast, scalable, and secure web applications. What you get: A fully deployed, high-performance website built on Next.js or React.',
    imgSrc: '/assets/image5.png'
  },
  { 
    n: '04', 
    title: 'Poster Design', 
    arm: 'Creative', 
    desc: 'What it is: Premium physical and digital poster design for campaigns, events, and corporate messaging. Who it is for: Event organizers, product launches, and corporate PR campaigns. What you get: Print-ready high-resolution files and digital assets optimized for social distribution.',
    imgSrc: '/assets/image2.png'
  },
  { 
    n: '05', 
    title: 'SMMA', 
    arm: 'Marketing', 
    desc: 'What it is: Social Media Marketing and Management to grow audience, engagement, and conversion rates. Who it is for: Brands and creators struggling with organic growth or content consistency. What you get: Monthly content calendars, community management, and growth analytics reports.',
    imgSrc: '/assets/image3.png'
  },
  { 
    n: '06', 
    title: 'Branding', 
    arm: 'Strategy', 
    desc: 'What it is: Comprehensive brand identity, positioning, and visual systems for corporate and luxury clients. Who it is for: New ventures or established companies needing a modern rebrand. What you get: A complete brand book, logo suite, typography guidelines, and voice documentation.',
    imgSrc: '/assets/image1.png'
  },
  { 
    n: '07', 
    title: 'Paid Marketing', 
    arm: 'Marketing', 
    desc: 'What it is: Data-driven Meta Ads, Google Ads, and other paid channels for maximized ROAS and lead generation. Who it is for: E-commerce and B2B businesses looking to scale their customer acquisition. What you get: Fully managed ad campaigns, A/B testing, and weekly performance breakdowns.' 
  },
  { 
    n: '08', 
    title: 'Database Management', 
    arm: 'Operations', 
    desc: 'What it is: Secure structuring, filtering, and management of enterprise data and CRM systems. Who it is for: Enterprises dealing with fragmented data or inefficient lead tracking. What you get: A clean, centralized database architecture integrated with your existing sales tools.' 
  },
]

export function Services() {
  return (
    <section id="services" className="relative bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <Reveal className="flex items-center gap-4 mb-8">
              <div className="h-px w-10 bg-gray-300" />
              <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-gray-500 font-bold">
                Core Divisions
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="font-body text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                Comprehensive Capabilities.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12} className="lg:text-right">
            <p className="font-body text-base text-gray-600 leading-relaxed max-w-lg lg:ml-auto mb-6">
              Eight distinct disciplines deployed across our operations. Every capability operates with radical transparency so you know exactly what you get.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-gray-200">
          {services.map(({ n, title, arm, desc, imgSrc }, i) => (
            <div
              key={title}
              className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-8 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-6 shrink-0 md:w-64 pl-4 md:pl-6">
                <span className="font-body text-xs font-bold text-gray-400 w-6 tabular-nums">{n}</span>
                <h3 className="font-body text-sm font-bold text-gray-900">
                  {title}
                </h3>
              </div>

              <div className="font-body text-sm text-gray-600 leading-relaxed flex-1 pr-4 flex flex-col xl:flex-row gap-6 xl:gap-8">
                <div className="flex-1 space-y-2">
                  {desc.split('. ').map((sentence, idx) => {
                    if (!sentence) return null
                    const parts = sentence.split(': ')
                    return (
                      <p key={idx}>
                        {parts.length > 1 ? (
                          <>
                            <strong className="text-gray-900 font-semibold">{parts[0]}:</strong> {parts[1]}
                            {idx !== desc.split('. ').length - 1 && '.'}
                          </>
                        ) : (
                          <>{sentence}.</>
                        )}
                      </p>
                    )
                  })}
                </div>
                {imgSrc && (
                  <div className="relative h-48 sm:h-64 md:h-56 xl:h-48 w-full xl:w-72 shrink-0 overflow-hidden rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <Image src={imgSrc} alt={title} fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center justify-between md:justify-end gap-8 pr-4 md:pr-6 mt-4 md:mt-0">
                <span
                  className="font-body text-[0.65rem] tracking-[0.1em] uppercase font-bold px-3 py-1 rounded-sm bg-[#0F3B68] text-white border border-[#0F3B68]"
                >
                  {arm}
                </span>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600 transition-colors hidden md:block" />
              </div>
            </div>
          ))}
        </div>

        <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-16 bg-gray-50 p-8 border border-gray-200">
          <div>
            <p className="font-body text-sm font-bold text-gray-900 mb-1">
              Determine operational alignment.
            </p>
            <p className="font-body text-sm text-gray-600">
              Not sure which division or capability fits your enterprise needs?
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-white bg-[#0F3B68] px-8 py-3.5 hover:bg-[#1E4D82] transition-colors rounded-sm"
          >
            Request Consultation
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
