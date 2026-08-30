const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  /<p style={{ fontFamily: 'var\\(--font-labels\\)', textTransform: 'uppercase', letterSpacing: '0\\.1em', color: 'var\\(--color-white\\)', marginBottom: '0', fontSize: '1rem', textAlign: 'center' }}>\\r?\\n\\s*OUR POSITION\\r?\\n\\s*<\/p>/,
  \<p style={{ fontFamily: 'var(--font-labels)', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-burgundy)', marginBottom: '4rem', fontSize: '0.85rem' }}>
            OUR POSITION
          </p>
          <h2 style={{ fontFamily: 'var(--font-headlines)', fontSize: 'clamp(1.5rem, 3.5vw, 3.5rem)', fontWeight: 'normal', lineHeight: 1.3, margin: 0, color: 'var(--color-white)' }}>
            Most influencer marketing looks the same. A brand picks a face with a large number under it, ships product, and hopes something sticks. The audience can tell within a second. They scroll past it the same way they scroll past an ad, because that is exactly what it is.
            <br/><br/>
            We built VELURYN AGNECY around a different idea: that a partnership only works when the creator would have said yes without being paid. When the product actually fits their life, their voice, their audience. That is the only kind of content that reads as real, and real is the only thing that still converts.
            <br/><br/>
            For brands, that means we say no to placements that do not fit, even when the numbers look tempting on paper. For creators, it means representation that treats your voice as the asset, not the inventory.
            <br/><br/>
            This is influencer marketing built like editorial work. Considered, crafted, and accountable to something better than a click.
          </h2>\
);

fs.writeFileSync('src/pages/Home.tsx', code);
