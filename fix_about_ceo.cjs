const fs = require('fs');
let content = fs.readFileSync('src/pages/About.tsx', 'utf8');

const replacement = `<div className="fade-up" style={{ marginTop: '8rem', paddingTop: '3rem', borderTop: '1px solid #eaeaea', opacity: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', maxWidth: '800px', flexWrap: 'wrap' }}>
              <img src="/images/CE.jpeg" alt="Vivin Bharathi" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: '250px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#666', lineHeight: 1.8, margin: 0 }}>
                  "A note from the founder I started VELURYN AGNECY after seeing the same problem from both sides: brands burning time and budget chasing creators who flake or overcharge, and creators doing great work but never getting paid reliably or on time. Before this, I built a verification service to help brands and founders figure out who they could trust that experience shaped how I built this agency: a straightforward, accountable pipeline between brands and creators, built on trust from the start." <br /><br />
                  <strong>Vivin Bharathi, Founder and Chairman</strong>
                </p>
              </div>
            </div>
          </div>`;

let newContent = content.replace(/<div className="fade-up" style=\{\{ marginTop: '8rem'.*?<\/div>\s*<\/div>/s, replacement + "\n\n        </div>");
fs.writeFileSync('src/pages/About.tsx', newContent);
