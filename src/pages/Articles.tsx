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
    id: "highly-influenced-generation",
    title: "THE HIGHLY INFLUENCED GENERATION",
    date: "September 7, 2026",
    tag: "Culture",
    excerpt: "How social media convinced an entire generation that they are falling behind.",
    body: [
      "There is something unusual happening to this generation.",
      "We have access to more information than any generation before us. We can learn almost anything, communicate with almost anyone, and watch people living lives thousands of kilometres away.",
      "Yet many people feel more inadequate than ever.",
      "Why?",
      "Because every time we open social media, we are shown someone who appears to be doing better.",
      "Someone is driving a better car. Someone is travelling to another country. Someone has built a company at 22. Someone bought a house. Someone is making thousands of dollars every month. Someone has the perfect body. Someone has a perfect relationship. Someone seems to have figured life out.",
      "And eventually, the question becomes:",
      "**“Why am I not there?”**",
      "## The comparison was never fair",
      "The biggest problem is that we compare our **entire life** to someone else's **highlight reel**.",
      "You see the apartment. You don't see the years of work that paid for it.",
      "You see the business revenue. You don't see the failed businesses, debt, employees, investors, or family support behind it.",
      "You see the vacation. You don't see the months of work before it.",
      "You see the successful person. You don't see the thousands of people who attempted the same thing and disappeared without ever becoming content.",
      "Social media removes context.",
      "It gives you the result without the process.",
      "And when you repeatedly consume results without context, your own process starts to feel like failure.",
      "## The algorithm doesn't care about your mental state",
      "Social media platforms are designed to keep you watching.",
      "Luxury gets attention. Success gets attention. Beauty gets attention. Controversy gets attention. Extreme lifestyles gets attention.",
      "A person quietly working for five years to build a stable life isn't nearly as interesting as someone claiming they made $100,000 in 30 days.",
      "So the algorithm keeps showing you the exceptional.",
      "Eventually, the exceptional starts looking normal.",
      "This is where the distortion begins.",
      "You start believing that everyone is travelling. Everyone is rich. Everyone is attractive. Everyone is successful. Everyone is building something. Everyone is moving forward.",
      "And somehow, **you are the only person standing still.**",
      "## The illusion of falling behind",
      "A 20-year-old sees another 20-year-old buying a Lamborghini.",
      "They think:",
      "**“I'm behind.”**",
      "But behind what?",
      "There is no universal timeline.",
      "There is no rule saying you should own a house at 25, become a millionaire at 21, start a company at 18, or have your entire career figured out before 30.",
      "Yet social media creates artificial deadlines.",
      "You don't just compare yourself with people around you anymore.",
      "You compare yourself with millions of people.",
      "And somewhere among those millions, there will always be someone younger, richer, better-looking, more successful, or more accomplished.",
      "If your definition of success is based on comparison, you have created a game that you cannot win.",
      "## The dangerous part",
      "Constant comparison doesn't always produce ambition.",
      "Sometimes it produces the opposite.",
      "It produces hopelessness.",
      "A person can look at the lives appearing on their screen and conclude:",
      "**“What's the point?”**",
      "They begin to believe that their circumstances make them insignificant.",
      "Their ordinary job feels worthless. Their small business feels worthless. Their progress feels worthless. Their body feels inadequate. Their home feels inadequate. Their life feels inadequate.",
      "Not necessarily because their life became worse.",
      "But because their **reference point changed.**",
      "Before social media, you might have compared your life with the people around you.",
      "Now you can compare yourself with the top 0.1% of people from around the world every single day.",
      "That is an enormous psychological difference.",
      "## We were never meant to see this much",
      "Human beings have always compared themselves with others.",
      "But the scale has changed.",
      "A person once had a relatively limited social environment.",
      "Today, a teenager can wake up and spend two hours consuming the lifestyles of celebrities, entrepreneurs, athletes, influencers, models, millionaires, and strangers from completely different socioeconomic backgrounds.",
      "And the brain doesn't necessarily process every post as:",
      "**“This is one carefully selected moment from one person somewhere in the world.”**",
      "It can simply register:",
      "**“Other people are doing better than me.”**",
      "Repeated often enough, that message becomes part of how a person sees themselves.",
      "## The highly influenced generation",
      "This is why we may be becoming a **highly influenced generation**.",
      "Not because young people are weak.",
      "Not because ambition is bad.",
      "Not because social media itself is inherently evil.",
      "But because we are living inside an unprecedented stream of other people's lives.",
      "We are constantly being told what success looks like. What beauty looks like. What wealth looks like. What happiness looks like. What relationships should look like. What our careers should look like. What our bodies should look like.",
      "And when your definition of a good life is constantly being supplied by other people, it becomes difficult to determine what **your** definition actually is.",
      "## You are not seeing reality",
      "Social media isn't necessarily showing you reality.",
      "It is showing you **what performs**.",
      "Those are two very different things.",
      "The person struggling quietly may never post.",
      "The person living an ordinary but fulfilling life may never go viral.",
      "The business making modest but consistent profits may never appear on your feed.",
      "The person who is happy with their life may not feel the need to prove it every day.",
      "The loudest lives are not necessarily the most successful lives.",
      "They are simply the lives that made the most compelling content.",
      "## The answer isn't to stop dreaming",
      "The solution isn't to become cynical about successful people.",
      "Their achievements can be real. Their wealth can be real. Their businesses can be real. Their success can be real.",
      "The problem begins when their reality becomes the measurement of your worth.",
      "You can admire someone without needing to become them.",
      "You can learn from someone without competing with them.",
      "You can want more without believing that what you currently have makes you worthless.",
      "Most importantly:",
      "**Someone else's progress is not evidence of your failure.**",
      "You are living a different life, with different circumstances, resources, opportunities, responsibilities and timelines.",
      "There is no algorithm that can determine whether you are doing enough.",
      "There is no follower count that can determine your value.",
      "There is no Lamborghini that can determine whether your life was meaningful.",
      "## We need to take back the definition of success",
      "Perhaps the most important thing this generation can do is stop asking:",
      "**“How does my life compare to theirs?”**",
      "And start asking:",
      "**“Is my life moving in the direction I actually want?”**",
      "Those are completely different questions.",
      "The first creates comparison.",
      "The second creates direction.",
      "Social media will continue showing us extraordinary lives.",
      "The question is whether we allow those lives to become the standard by which we judge our own.",
      "Because if we do, we may spend our entire lives chasing a life we never actually wanted.",
      "**VELURYN AGNECY**",
      "*Technology changes how we see the world. But we still have to decide what the world means to us.*"
    ]
  },
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
      "## AI Isn't the Business",
      "A growing number of people are positioning themselves as 'AI automation agencies,' 'AI consultants,' or 'AI operators' despite having very little understanding of the businesses they are supposedly automating.",
      "They learn how to connect a chatbot to a CRM. They build a Zapier workflow. They connect ChatGPT to an email inbox. They create an AI voice agent.",
      "Then they package it as a $2,000, $5,000, or $10,000 'AI transformation.'",
      "The technology might work. But technology working does not automatically mean the business has created value.",
      "A company does not care whether something uses GPT, Claude, an open-source model, or a complicated collection of APIs. It cares whether revenue increases, costs decrease, employees become more productive, customers receive better service, operations become faster, mistakes decrease, or margins improve.",
      "AI is the mechanism. The outcome is the product. That distinction is already being lost.",
      "## The Dropshipping Problem",
      "The comparison to dropshipping is not that AI is fake. Dropshipping is a real business model. AI is real technology. The similarity is the gold rush surrounding them.",
      "When dropshipping became popular, thousands of people weren't necessarily interested in building exceptional e-commerce businesses. They were interested in selling the idea of building an exceptional e-commerce business.",
      "The same thing is happening with AI. You see people selling: 'Build an AI agency.' 'Automate businesses.' 'Make $10K/month with AI.' 'Replace an entire department with AI.' 'Start your AI automation agency in 7 days.'",
      "The business opportunity becomes more important than the underlying technology. And eventually, the market gets crowded with people selling essentially the same thing.",
      "## The First People Get Paid. The Last People Get Outrun.",
      "There is a predictable pattern with internet business trends. The first group discovers an opportunity. The second group studies it and enters the market. The third group sees screenshots of the second group making money and joins. Then the fourth group starts selling courses to the third group.",
      "Eventually, the market is no longer primarily about the original opportunity. It becomes an industry built around the idea of the opportunity.",
      "AI automation is moving dangerously close to that stage. The easiest implementations are becoming increasingly commoditized. A business owner can now use increasingly capable AI tools without hiring an 'AI agency' to explain what a chatbot is.",
      "The tools themselves are becoming easier to use. That creates an uncomfortable question for automation agencies: What exactly are you selling when the automation can increasingly be built by the customer?",
      "## AI Will Not Replace Everyone. But AI Will Replace a Lot of Mediocrity.",
      "This is where the conversation gets more interesting. The real threat isn't necessarily: 'AI will take everyone's jobs.' It is closer to: Businesses will stop paying people to perform work that can be done adequately by software.",
      "That distinction matters.",
      "If someone's entire value proposition is manually moving information between systems, writing repetitive emails, producing basic reports, answering predictable questions, or performing repetitive administrative work, AI and automation are obvious threats.",
      "But someone who understands strategy, customers, operations, sales, psychology, product, branding, and decision-making becomes considerably more valuable when AI gives them leverage.",
      "AI doesn't eliminate the need for capable people. It increases the gap between capable people and everyone else.",
      "## The Businesses That Survive Won't Be 'AI Businesses'",
      "The companies most likely to benefit from AI may not even market themselves as AI companies.",
      "A fashion brand might use AI to analyse customer behaviour. A marketing agency might use AI to analyse thousands of creators. A logistics company might use AI to optimise routes. A law firm might use AI to organise documents. A software company might use AI throughout development.",
      "None of those businesses necessarily need to become an 'AI company.' They simply use better tools.",
      "That is where the conversation should be moving. Away from: 'How can we sell AI?' And toward: 'Where is intelligence currently slowing the business down?'",
      "That is a much harder question. It also produces much better businesses.",
      "## The Automation Arms Race",
      "There is another problem. Once everyone has access to similar AI models, AI itself stops being much of a competitive advantage.",
      "If Company A has an AI sales assistant and Company B gets the same capability two weeks later, the advantage disappears. If every agency can build an AI receptionist, having an AI receptionist isn't differentiation. If every marketing company can generate 100 pieces of content in an afternoon, generating 100 pieces of content isn't differentiation.",
      "The advantage moves upward. Implementation becomes commoditized. Judgment becomes valuable.",
      "The companies that win will be the ones that know what should be automated, what shouldn't be automated, where AI creates leverage, where humans are still essential, how the technology fits into the existing operation, and how to measure whether it actually worked.",
      "That requires business understanding. Not another prompt template.",
      "## AI Is Here to Stay. The Hype Isn't.",
      "This is the part that gets misunderstood. Calling the AI automation boom overhyped does not mean believing AI is a fad.",
      "The internet was surrounded by hype in the 1990s. The dot-com bubble eventually collapsed. The internet didn't disappear. The companies with no defensible business models disappeared.",
      "The same distinction applies to AI. AI will probably become significantly more important to business over the next decade. But many of today's AI businesses, agencies, offers, courses, workflows and 'get rich with AI' models will not survive.",
      "That isn't necessarily a failure of AI. It is the normal process of technological adoption. The technology stays. The excess gets removed.",
      "## What Comes After the Hype?",
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

  const renderContent = (text: string) => {
    // Basic markdown parsing for bold and italics
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    return { __html: html };
  };

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
                      if (paragraph.startsWith('## ') || paragraph.startsWith('### ')) {
                        const cleanHeading = paragraph.replace(/^#+\s/, '');
                        return (
                          <h3 key={idx} style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.4rem', fontWeight: 600, marginTop: '2.5rem', marginBottom: '1rem', color: '#111' }} dangerouslySetInnerHTML={renderContent(cleanHeading)} />
                        );
                      }
                      return (
                        <p key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#444', lineHeight: 1.8, marginBottom: '1.25rem' }} dangerouslySetInnerHTML={renderContent(paragraph)} />
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
