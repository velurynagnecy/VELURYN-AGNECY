import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { useParallax } from '../hooks/useParallax';

gsap.registerPlugin(ScrollTrigger);

interface Article {
  id: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  body: string[];
}

const articles: Article[] = [
  {
    id: "ai-automation-gold-rush",
    title: "The AI Automation Gold Rush: When Businesses Start Selling the Hype Instead of the Value",
    date: "September 6, 2026",
    tag: "Theory",
    excerpt: "Artificial intelligence is changing business. But what is becoming increasingly difficult to separate is actual AI adoption from the business built around selling AI adoption.",
    body: [
      "Artificial intelligence is changing business. That part is not controversial.",
      "What is becoming increasingly difficult to separate, however, is actual AI adoption from the business built around selling AI adoption.",
      "Every few months, the internet discovers a new shortcut to wealth. Dropshipping was supposed to let anyone build a global e-commerce company from a laptop. Then came SMMA. Then crypto. Then NFTs. Then 'faceless' content. Now, it is AI automation.",
      "The terminology changes. The underlying promise remains remarkably similar: Find a business. Add a few tools. Automate everything. Charge the business thousands of dollars. Scale without employees.",
      "It sounds extremely attractive. And that is precisely the problem.",
      "### AI Isn't the Business",
      "A growing number of people are positioning themselves as 'AI automation agencies,' 'AI consultants,' or 'AI operators' despite having very little understanding of the businesses they are supposedly automating.",
      "They learn how to connect a chatbot to a CRM. They build a Zapier workflow. They connect ChatGPT to an email inbox. They create an AI voice agent.",
      "Then they package it as a $2,000, $5,000, or $10,000 'AI transformation.'",
      "The technology might work. But technology working does not automatically mean the business has created value.",
      "A company does not care whether something uses GPT, Claude, an open-source model, or a complicated collection of APIs. It cares whether revenue increases, costs decrease, employees become more productive, customers receive better service, operations become faster, mistakes decrease, or margins improve.",
      "AI is the mechanism. The outcome is the product. That distinction is already being lost.",
      "### The Dropshipping Problem",
      "The comparison to dropshipping is not that AI is fake. Dropshipping is a real business model. AI is real technology. The similarity is the gold rush surrounding them.",
      "When dropshipping became popular, thousands of people weren't necessarily interested in building exceptional e-commerce businesses. They were interested in selling the idea of building an exceptional e-commerce business.",
      "The same thing is happening with AI. You see people selling: 'Build an AI agency.' 'Automate businesses.' 'Make $10K/month with AI.' 'Replace an entire department with AI.' 'Start your AI automation agency in 7 days.'",
      "The business opportunity becomes more important than the underlying technology. And eventually, the market gets crowded with people selling essentially the same thing.",
      "### The First People Get Paid. The Last People Get Outrun.",
      "There is a predictable pattern with internet business trends. The first group discovers an opportunity. The second group studies it and enters the market. The third group sees screenshots of the second group making money and joins. Then the fourth group starts selling courses to the third group.",
      "Eventually, the market is no longer primarily about the original opportunity. It becomes an industry built around the idea of the opportunity.",
      "AI automation is moving dangerously close to that stage. The easiest implementations are becoming increasingly commoditized. A business owner can now use increasingly capable AI tools without hiring an 'AI agency' to explain what a chatbot is.",
      "The tools themselves are becoming easier to use. That creates an uncomfortable question for automation agencies: What exactly are you selling when the automation can increasingly be built by the customer?",
      "### AI Will Not Replace Everyone. But AI Will Replace a Lot of Mediocrity.",
      "This is where the conversation gets more interesting. The real threat isn't necessarily: 'AI will take everyone's jobs.' It is closer to: Businesses will stop paying people to perform work that can be done adequately by software.",
      "That distinction matters.",
      "If someone's entire value proposition is manually moving information between systems, writing repetitive emails, producing basic reports, answering predictable questions, or performing repetitive administrative work, AI and automation are obvious threats.",
      "But someone who understands strategy, customers, operations, sales, psychology, product, branding, and decision-making becomes considerably more valuable when AI gives them leverage.",
      "AI doesn't eliminate the need for capable people. It increases the gap between capable people and everyone else.",
      "### The Businesses That Survive Won't Be 'AI Businesses'",
      "The companies most likely to benefit from AI may not even market themselves as AI companies.",
      "A fashion brand might use AI to analyse customer behaviour. A marketing agency might use AI to analyse thousands of creators. A logistics company might use AI to optimise routes. A law firm might use AI to organise documents. A software company might use AI throughout development.",
      "None of those businesses necessarily need to become an 'AI company.' They simply use better tools.",
      "That is where the conversation should be moving. Away from: 'How can we sell AI?' And toward: 'Where is intelligence currently slowing the business down?'",
      "That is a much harder question. It also produces much better businesses.",
      "### The Automation Arms Race",
      "There is another problem. Once everyone has access to similar AI models, AI itself stops being much of a competitive advantage.",
      "If Company A has an AI sales assistant and Company B gets the same capability two weeks later, the advantage disappears. If every agency can build an AI receptionist, having an AI receptionist isn't differentiation. If every marketing company can generate 100 pieces of content in an afternoon, generating 100 pieces of content isn't differentiation.",
      "The advantage moves upward. Implementation becomes commoditized. Judgment becomes valuable.",
      "The companies that win will be the ones that know what should be automated, what shouldn't be automated, where AI creates leverage, where humans are still essential, how the technology fits into the existing operation, and how to measure whether it actually worked.",
      "That requires business understanding. Not another prompt template.",
      "### AI Is Here to Stay. The Hype Isn't.",
      "This is the part that gets misunderstood. Calling the AI automation boom overhyped does not mean believing AI is a fad.",
      "The internet was surrounded by hype in the 1990s. The dot-com bubble eventually collapsed. The internet didn't disappear. The companies with no defensible business models disappeared.",
      "The same distinction applies to AI. AI will probably become significantly more important to business over the next decade. But many of today's AI businesses, agencies, offers, courses, workflows and 'get rich with AI' models will not survive.",
      "That isn't necessarily a failure of AI. It is the normal process of technological adoption. The technology stays. The excess gets removed.",
      "### What Comes After the Hype?",
      "Eventually, businesses stop asking: 'Do we need AI?' And start asking: 'Where does AI actually make us better?'",
      "That's when the serious market begins.",
      "The winners won't necessarily be the people shouting the loudest about AI. They will be the people who understand business well enough to use AI without making AI the entire business.",
      "At VELURYN AGNECY, that distinction matters.",
      "We don't believe the future belongs to businesses that simply attach 'AI' to everything they sell. It belongs to businesses that understand where technology creates real leverage - and where it doesn't.",
      "Because AI isn't going away. But the hype around it eventually will.",
      "And when it does, a lot of people who built their business around the hype will discover that they were never actually building a business. They were riding a trend."
    ]
  }
];

export default function Articles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useParallax(heroRef, bgRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-up', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fade-up',
          start: 'top 85%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-black)' }}>
      <Helmet>
        <title>Articles | VELURYN AGNECY</title>
        <meta name="description" content="Perspectives on marketing, talent, content and culture from VELURYN AGNECY." />
      </Helmet>

      {/* Hero Section */}
      <section ref={heroRef} style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', paddingTop: '160px', paddingBottom: '120px', paddingLeft: '4rem', paddingRight: '4rem', color: '#fff' }}>
        <div 
          ref={bgRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: 'linear-gradient(100deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%), url(/images/about-hero.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            willChange: 'transform'
          }}
        />
        <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="fade-up" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2rem', opacity: 0.7 }}>From the Agnecy</p>
          <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem', maxWidth: '1000px' }}>
            Articles
          </h1>
          <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', lineHeight: 1.6 }}>
            Our perspective on marketing, talent, content and the way we work.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section style={{ padding: '4rem 4rem 8rem 4rem', backgroundColor: '#f5f5f5' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {articles.length === 0 ? (
            <div className="fade-up" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#888', lineHeight: 1.8 }}>
                New articles are on the way. Check back soon.
              </p>
              <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s', marginTop: '2rem' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
                Get in touch <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {articles.map((article) => (
                <article key={article.id} className="fade-up" style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                  <div style={{ padding: '3.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem', color: '#888' }}>{article.tag}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: '#aaa' }}>{article.date}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: '2rem', fontWeight: 600, marginBottom: '2.5rem', lineHeight: 1.3 }}>
                      {article.title}
                    </h2>
                    
                    {article.body.map((paragraph, idx) => {
                      if (paragraph.startsWith('### ')) {
                        return (
                          <h3 key={idx} style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem', color: '#111' }}>
                            {paragraph.replace('### ', '')}
                          </h3>
                        );
                      }
                      return (
                        <p key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#444', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
