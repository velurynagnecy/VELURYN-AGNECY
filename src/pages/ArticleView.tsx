import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles } from '../data/articles';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.id === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!article) return;
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
  }, [article]);

  // If the article is not found, redirect to the 404 page
  if (!article) {
    return <Navigate to="/404" replace />;
  }

  const renderContent = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
    return { __html: html };
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: '#fafafa', color: 'var(--color-black)', minHeight: '100vh', paddingTop: '160px', paddingBottom: '120px' }}>
      <Helmet>
        <title>{article.title} | VELURYN AGNECY</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="fade-up" style={{ marginBottom: '3rem' }}>
          <Link to="/articles" style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', color: '#888', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#111'} onMouseOut={(e) => e.currentTarget.style.color = '#888'}>
            &larr; Back to Articles
          </Link>
        </div>
        
        <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem', color: 'var(--color-black)', fontWeight: 600 }}>{article.tag}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#888' }}>{article.date}</span>
        </div>
        
        <h1 className="fade-up" style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 'normal', marginBottom: '3rem' }}>
          {article.title}
        </h1>
        
        <p className="fade-up" style={{ fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: '#666', lineHeight: 1.6, marginBottom: '4rem', fontStyle: 'italic' }}>
          {article.excerpt}
        </p>
        
        <div className="fade-up" style={{ borderTop: '1px solid #eaeaea', paddingTop: '4rem' }}>
          {article.body.map((paragraph, idx) => {
            if (paragraph.startsWith('## ') || paragraph.startsWith('### ')) {
              const cleanHeading = paragraph.replace(/^#+\s/, '');
              return (
                <h3 key={idx} style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.8rem', fontWeight: 600, marginTop: '3.5rem', marginBottom: '1.5rem', color: '#111' }} dangerouslySetInnerHTML={renderContent(cleanHeading)} />
              );
            }
            return (
              <p key={idx} style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: '#444', lineHeight: 1.8, marginBottom: '1.5rem' }} dangerouslySetInnerHTML={renderContent(paragraph)} />
            );
          })}
        </div>

        <div className="fade-up" style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
          <h4 style={{ fontFamily: 'var(--font-headlines)', fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 'normal' }}>Ready to scale?</h4>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: 'var(--color-black)', color: 'var(--color-white)', padding: '1rem 2rem', borderRadius: '30px', fontFamily: 'var(--font-body)', textDecoration: 'none', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-burgundy)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--color-black)'}>
            Work with us <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
